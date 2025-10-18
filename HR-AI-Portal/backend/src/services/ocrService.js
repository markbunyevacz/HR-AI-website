const Tesseract = require('tesseract.js');
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const sharp = require('sharp');

/**
 * OCR Service for extracting text from PDFs and images
 * Uses Tesseract.js for document recognition
 */

class OCRService {
  constructor() {
    this.worker = null;
    this.isInitialized = false;
  }

  /**
   * Initialize the Tesseract worker
   * Must be called once at application startup
   */
  async initialize() {
    try {
      if (!this.isInitialized) {
        this.worker = await Tesseract.createWorker({
          langPath: 'https://tessdata.projectnaptha.com/4.0.0',
          cacheType: 'disk',
          logger: (m) => {
            if (process.env.NODE_ENV === 'development') {
              console.log('[OCR]', m);
            }
          },
        });

        await this.worker.loadLanguage('eng');
        await this.worker.initialize('eng');
        await this.worker.setParameters({
          tessedit_char_whitelist:
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@.-_() ',
        });

        this.isInitialized = true;
        console.log('✅ OCR Service initialized successfully');
      }
    } catch (error) {
      console.error('❌ Error initializing OCR Service:', error);
      throw new Error('Failed to initialize OCR service');
    }
  }

  /**
   * Extract text from an image file using Tesseract
   * @param {string} imagePath - Path to the image file
   * @param {object} options - OCR options
   * @returns {Promise<object>} - Extracted text and metadata
   */
  async extractFromImage(imagePath, options = {}) {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      console.log(`[OCR] Extracting text from image: ${imagePath}`);

      const {
        preprocessImage = true,
        psm = 3, // PSM (Page Segmentation Mode)
      } = options;

      let imageToParse = imagePath;

      // Preprocess image if requested
      if (preprocessImage) {
        imageToParse = await this.preprocessImage(imagePath);
      }

      // Run OCR
      const {
        data: { text, confidence, lines },
      } = await this.worker.recognize(imageToParse);

      // Extract structured data
      const structuredData = this.parseExtractedText(text);

      return {
        success: true,
        rawText: text.trim(),
        confidence: Math.round(confidence),
        lines: lines.map((line) => ({
          text: line.text,
          confidence: Math.round(line.confidence),
        })),
        structuredData,
        metadata: {
          source: 'image',
          processedAt: new Date(),
          imageFile: path.basename(imagePath),
        },
      };
    } catch (error) {
      console.error('❌ Error extracting from image:', error);
      throw new Error(`OCR extraction failed: ${error.message}`);
    }
  }

  /**
   * Extract text from a PDF file
   * @param {string} pdfPath - Path to the PDF file
   * @param {object} options - PDF processing options
   * @returns {Promise<object>} - Extracted text and metadata
   */
  async extractFromPdf(pdfPath, options = {}) {
    try {
      console.log(`[OCR] Extracting text from PDF: ${pdfPath}`);

      const { pageRange, preprocessImages = true } = options;

      // Read PDF file
      const fileContent = fs.readFileSync(pdfPath);

      // Parse PDF to get text content
      const pdfData = await pdfParse(fileContent);
      const pageCount = pdfData.numpages;

      // Determine pages to process
      let pagesToProcess = Array.from({ length: pageCount }, (_, i) => i + 1);

      if (pageRange) {
        const [start, end] = pageRange;
        pagesToProcess = pagesToProcess.slice(start - 1, end);
      }

      // Extract text from PDF pages using OCR for images
      const extractedPages = [];
      let totalConfidence = 0;
      let totalExtracted = 0;

      for (const pageNum of pagesToProcess) {
        try {
          const pageImage = await this.convertPdfPageToImage(pdfPath, pageNum);

          const pageResult = await this.extractFromImage(pageImage, {
            preprocessImage: preprocessImages,
          });

          extractedPages.push({
            pageNumber: pageNum,
            text: pageResult.rawText,
            confidence: pageResult.confidence,
          });

          totalConfidence += pageResult.confidence;
          totalExtracted++;

          // Cleanup temporary image
          if (fs.existsSync(pageImage)) {
            fs.unlinkSync(pageImage);
          }
        } catch (err) {
          console.error(`Error processing page ${pageNum}:`, err);
          extractedPages.push({
            pageNumber: pageNum,
            text: '',
            confidence: 0,
            error: err.message,
          });
        }
      }

      // Combine text from all pages
      const combinedText = extractedPages
        .map((p) => p.text)
        .join('\n---PAGE BREAK---\n')
        .trim();

      const structuredData = this.parseExtractedText(combinedText);

      return {
        success: true,
        rawText: combinedText,
        confidence: Math.round(totalExtracted > 0 ? totalConfidence / totalExtracted : 0),
        pages: extractedPages,
        pageCount: pagesToProcess.length,
        structuredData,
        metadata: {
          source: 'pdf',
          processedAt: new Date(),
          pdfFile: path.basename(pdfPath),
          totalPages: pageCount,
          pagesProcessed: pagesToProcess.length,
        },
      };
    } catch (error) {
      console.error('❌ Error extracting from PDF:', error);
      throw new Error(`PDF OCR extraction failed: ${error.message}`);
    }
  }

  /**
   * Preprocess image to improve OCR accuracy
   * - Increase contrast
   * - Convert to grayscale
   * - Resize if too small
   * @param {string} imagePath - Path to the image
   * @returns {Promise<string>} - Path to preprocessed image
   */
  async preprocessImage(imagePath) {
    try {
      const tempPath = path.join(
        path.dirname(imagePath),
        `preprocessed-${Date.now()}.png`
      );

      await sharp(imagePath)
        .grayscale() // Convert to grayscale
        .normalize() // Improve contrast
        .resize(2000, 2000, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .png({ quality: 100 })
        .toFile(tempPath);

      console.log(`✅ Image preprocessed: ${tempPath}`);
      return tempPath;
    } catch (error) {
      console.error('Error preprocessing image:', error);
      // Return original if preprocessing fails
      return imagePath;
    }
  }

  /**
   * Convert a specific PDF page to an image
   * Note: Requires pdf2image or similar tool
   * For production, consider using pdf-poppler or similar
   * @param {string} pdfPath - Path to PDF
   * @param {number} pageNum - Page number to convert
   * @returns {Promise<string>} - Path to generated image
   */
  async convertPdfPageToImage(pdfPath, pageNum) {
    try {
      // For now, return error as this requires pdf2image
      // In production, integrate pdf-poppler or similar library
      throw new Error(
        'PDF to image conversion requires pdf2image. Please install: npm install pdf2image'
      );
    } catch (error) {
      console.error('Error converting PDF page to image:', error);
      throw error;
    }
  }

  /**
   * Parse extracted text to find structured data
   * - Extract email addresses
   * - Extract phone numbers
   * - Extract names
   * - Extract dates
   * @param {string} text - Raw extracted text
   * @returns {object} - Structured data
   */
  parseExtractedText(text) {
    const structured = {
      emails: [],
      phones: [],
      dates: [],
      names: [],
      skills: [],
    };

    // Extract emails
    const emailRegex = /[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    structured.emails = [...new Set(text.match(emailRegex) || [])];

    // Extract phone numbers
    const phoneRegex = /(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
    structured.phones = [...new Set(text.match(phoneRegex) || [])];

    // Extract dates (MM/DD/YYYY, DD/MM/YYYY, YYYY-MM-DD, etc.)
    const dateRegex = /\d{1,2}[-/]\d{1,2}[-/]\d{2,4}|\d{4}[-/]\d{1,2}[-/]\d{1,2}/g;
    structured.dates = [...new Set(text.match(dateRegex) || [])];

    // Extract potential names (capitalized words)
    const nameRegex = /\b[A-Z][a-z]+ [A-Z][a-z]+\b/g;
    structured.names = [...new Set(text.match(nameRegex) || [])];

    // Extract potential skills (common keywords)
    const skillsKeywords = [
      'JavaScript',
      'Python',
      'Java',
      'React',
      'Node.js',
      'SQL',
      'AWS',
      'Docker',
      'Kubernetes',
      'Git',
      'Agile',
      'Scrum',
      'DevOps',
      'Machine Learning',
      'Data Analysis',
      'Project Management',
    ];

    skillsKeywords.forEach((skill) => {
      if (text.toLowerCase().includes(skill.toLowerCase())) {
        structured.skills.push(skill);
      }
    });

    return structured;
  }

  /**
   * Process a batch of files
   * @param {array} filePaths - Array of file paths to process
   * @param {object} options - Processing options
   * @returns {Promise<array>} - Array of results
   */
  async processBatch(filePaths, options = {}) {
    try {
      const results = [];

      for (const filePath of filePaths) {
        try {
          const ext = path.extname(filePath).toLowerCase();
          let result;

          if (ext === '.pdf') {
            result = await this.extractFromPdf(filePath, options);
          } else if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
            result = await this.extractFromImage(filePath, options);
          } else {
            result = {
              success: false,
              error: `Unsupported file type: ${ext}`,
            };
          }

          results.push({
            file: path.basename(filePath),
            ...result,
          });
        } catch (error) {
          results.push({
            file: path.basename(filePath),
            success: false,
            error: error.message,
          });
        }
      }

      return results;
    } catch (error) {
      console.error('❌ Error processing batch:', error);
      throw new Error(`Batch processing failed: ${error.message}`);
    }
  }

  /**
   * Terminate the OCR worker
   */
  async terminate() {
    try {
      if (this.worker) {
        await this.worker.terminate();
        this.isInitialized = false;
        console.log('✅ OCR Service terminated');
      }
    } catch (error) {
      console.error('Error terminating OCR Service:', error);
    }
  }

  /**
   * Health check
   * @returns {object} - Health status
   */
  getStatus() {
    return {
      initialized: this.isInitialized,
      workerActive: this.worker !== null,
      timestamp: new Date(),
    };
  }
}

module.exports = new OCRService();
