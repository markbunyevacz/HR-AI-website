const { OCRResult } = require('../models');

/**
 * OCR Data Service for parsing and storing OCR results
 * Handles structured data extraction and database storage
 */

class OCRDataService {
  constructor() {
    this.skillKeywords = [
      'JavaScript', 'Python', 'Java', 'C++', 'C#', 'PHP', 'Ruby', 'Go', 'Rust',
      'React', 'Angular', 'Vue.js', 'Node.js', 'Express', 'Django', 'Flask',
      'Spring', 'Laravel', 'SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Redis',
      'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Jenkins', 'Git', 'GitHub',
      'Agile', 'Scrum', 'Kanban', 'JIRA', 'Confluence', 'Slack', 'Teams',
      'DevOps', 'CI/CD', 'Machine Learning', 'AI', 'Data Science', 'Analytics',
      'Project Management', 'Product Management', 'Business Analysis',
      'Leadership', 'Team Management', 'Communication', 'Problem Solving',
      'HTML', 'CSS', 'SASS', 'LESS', 'Bootstrap', 'Material-UI', 'Tailwind',
      'TypeScript', 'GraphQL', 'REST', 'API', 'Microservices', 'Serverless',
      'Linux', 'Windows', 'macOS', 'Ubuntu', 'CentOS', 'Debian', 'Bash',
      'PowerShell', 'Active Directory', 'Office 365', 'SharePoint',
      'Salesforce', 'SAP', 'Oracle', 'Tableau', 'Power BI', 'Excel',
      'Word', 'PowerPoint', 'Outlook', 'Visio', 'Adobe Creative Suite',
      'Photoshop', 'Illustrator', 'InDesign', 'Figma', 'Sketch', 'XD',
      'SEO', 'SEM', 'Google Ads', 'Facebook Ads', 'LinkedIn Marketing',
      'Content Marketing', 'Social Media', 'Email Marketing', 'CRM',
      'Sales', 'Marketing', 'Customer Service', 'Support', 'Help Desk',
      'IT Support', 'Network Administration', 'Cybersecurity', 'Penetration Testing',
      'Ethical Hacking', 'Security+', 'CISSP', 'CEH', 'CompTIA',
      'PMP', 'PRINCE2', 'Six Sigma', 'Lean', 'Kaizen', 'ISO 9001',
      'Quality Assurance', 'Testing', 'QA', 'Manual Testing', 'Automation',
      'Selenium', 'Cypress', 'Jest', 'Mocha', 'Chai', 'JUnit', 'TestNG',
      'Performance Testing', 'Load Testing', 'Stress Testing', 'Regression Testing'
    ];
  }

  /**
   * Parse OCR result and update database
   * @param {string} jobId - Bull job ID
   * @param {object} ocrResult - OCR processing result
   * @returns {Promise<object>} - Updated OCR result
   */
  async parseAndStoreOCRResult(jobId, ocrResult) {
    try {
      console.log(`[OCR Data] Parsing result for job ${jobId}`);

      // Find OCR result record
      const resultRecord = await OCRResult.findOne({
        where: { jobId }
      });

      if (!resultRecord) {
        throw new Error(`OCR result record not found for job ${jobId}`);
      }

      // Parse extracted data
      const structuredData = this.parseStructuredData(ocrResult.rawText);

      // Update the record
      await resultRecord.update({
        status: ocrResult.success ? 'completed' : 'failed',
        rawText: ocrResult.rawText,
        confidence: ocrResult.confidence,
        extractedData: structuredData,
        processingStartedAt: resultRecord.processingStartedAt || new Date(),
        processingCompletedAt: new Date(),
        errorMessage: ocrResult.success ? null : ocrResult.error
      });

      console.log(`[OCR Data] Successfully stored OCR result for job ${jobId}`);
      return resultRecord;
    } catch (error) {
      console.error(`[OCR Data] Error parsing OCR result for job ${jobId}:`, error);

      // Update record with error
      if (jobId) {
        await OCRResult.update(
          {
            status: 'failed',
            errorMessage: error.message,
            processingCompletedAt: new Date()
          },
          { where: { jobId } }
        );
      }

      throw error;
    }
  }

  /**
   * Parse structured data from OCR text
   * @param {string} text - Raw OCR text
   * @returns {object} - Structured data object
   */
  parseStructuredData(text) {
    const structured = {
      emails: [],
      phones: [],
      dates: [],
      names: [],
      skills: [],
      education: [],
      experience: [],
      summary: '',
      keywords: []
    };

    if (!text) return structured;

    // Extract emails
    const emailRegex = /[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    structured.emails = [...new Set(text.match(emailRegex) || [])];

    // Extract phone numbers
    const phoneRegex = /(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
    structured.phones = [...new Set(text.match(phoneRegex) || [])];

    // Extract dates (multiple formats)
    const dateRegex = /\d{1,2}[-/]\d{1,2}[-/]\d{2,4}|\d{4}[-/]\d{1,2}[-/]\d{1,2}/g;
    structured.dates = [...new Set(text.match(dateRegex) || [])];

    // Extract potential names (capitalized words)
    const nameRegex = /\b[A-Z][a-z]+ [A-Z][a-z]+\b/g;
    structured.names = [...new Set(text.match(nameRegex) || [])];

    // Extract skills
    const textLower = text.toLowerCase();
    this.skillKeywords.forEach(skill => {
      if (textLower.includes(skill.toLowerCase())) {
        structured.skills.push(skill);
      }
    });

    // Extract education keywords
    const educationKeywords = [
      'bachelor', 'master', 'phd', 'doctorate', 'degree', 'university', 'college',
      'b.a.', 'b.s.', 'm.a.', 'm.s.', 'm.b.a.', 'ph.d.', 'associate',
      'certificate', 'diploma', 'certification'
    ];

    educationKeywords.forEach(keyword => {
      if (textLower.includes(keyword)) {
        structured.education.push(keyword);
      }
    });

    // Extract experience keywords
    const experienceKeywords = [
      'years', 'experience', 'worked', 'employed', 'position', 'role',
      'manager', 'director', 'senior', 'junior', 'lead', 'principal',
      'intern', 'contractor', 'consultant', 'freelance'
    ];

    experienceKeywords.forEach(keyword => {
      if (textLower.includes(keyword)) {
        structured.experience.push(keyword);
      }
    });

    // Generate summary (first few sentences)
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 20);
    if (sentences.length > 0) {
      structured.summary = sentences.slice(0, 3).join('. ').trim() + '.';
    }

    // Generate keywords (important words/phrases)
    const keywords = textLower.match(/\b[a-z]{4,}\b/g) || [];
    const keywordFreq = {};

    keywords.forEach(word => {
      if (!['this', 'that', 'with', 'from', 'they', 'have', 'been', 'will', 'said'].includes(word)) {
        keywordFreq[word] = (keywordFreq[word] || 0) + 1;
      }
    });

    structured.keywords = Object.entries(keywordFreq)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 20)
      .map(([word]) => word);

    return structured;
  }

  /**
   * Get OCR results with filtering and pagination
   * @param {object} filters - Filter options
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @returns {Promise<object>} - Paginated results
   */
  async getOCRResults(filters = {}, page = 1, limit = 10) {
    try {
      const whereClause = {};

      // Apply filters
      if (filters.userId) {
        whereClause.userId = filters.userId;
      }

      if (filters.status) {
        whereClause.status = filters.status;
      }

      if (filters.dateFrom) {
        whereClause.createdAt = {
          ...whereClause.createdAt,
          [require('sequelize').Op.gte]: new Date(filters.dateFrom)
        };
      }

      if (filters.dateTo) {
        whereClause.createdAt = {
          ...whereClause.createdAt,
          [require('sequelize').Op.lte]: new Date(filters.dateTo)
        };
      }

      if (filters.search) {
        whereClause[require('sequelize').Op.or] = [
          { fileName: { [require('sequelize').Op.iLike]: `%${filters.search}%` } },
          { rawText: { [require('sequelize').Op.iLike]: `%${filters.search}%` } }
        ];
      }

      const { count, rows } = await OCRResult.findAndCountAll({
        where: whereClause,
        order: [['createdAt', 'DESC']],
        limit: parseInt(limit),
        offset: (parseInt(page) - 1) * parseInt(limit),
      });

      return {
        results: rows,
        pagination: {
          total: count,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(count / parseInt(limit))
        }
      };
    } catch (error) {
      console.error('Error getting OCR results:', error);
      throw new Error('Failed to retrieve OCR results');
    }
  }

  /**
   * Update OCR result with manual corrections
   * @param {string} resultId - OCR result ID
   * @param {string} userId - User making the update
   * @param {object} corrections - Correction data
   * @returns {Promise<object>} - Updated result
   */
  async updateOCRResult(resultId, userId, corrections) {
    try {
      const result = await OCRResult.findOne({
        where: { id: resultId, userId }
      });

      if (!result) {
        throw new Error('OCR result not found');
      }

      // Apply corrections to extracted data
      const updatedData = {
        ...result.extractedData,
        ...corrections,
        manuallyCorrected: true,
        correctedAt: new Date(),
        correctedBy: userId
      };

      await result.update({
        extractedData: updatedData,
        status: 'completed' // Mark as completed after corrections
      });

      return result;
    } catch (error) {
      console.error('Error updating OCR result:', error);
      throw new Error('Failed to update OCR result');
    }
  }

  /**
   * Delete OCR result
   * @param {string} resultId - OCR result ID
   * @param {string} userId - User making the deletion
   * @returns {Promise<boolean>} - Success status
   */
  async deleteOCRResult(resultId, userId) {
    try {
      const deleted = await OCRResult.destroy({
        where: { id: resultId, userId }
      });

      return deleted > 0;
    } catch (error) {
      console.error('Error deleting OCR result:', error);
      throw new Error('Failed to delete OCR result');
    }
  }

  /**
   * Get OCR statistics
   * @param {string} userId - User ID (optional)
   * @returns {Promise<object>} - Statistics
   */
  async getOCRStatistics(userId = null) {
    try {
      const whereClause = userId ? { userId } : {};

      const [
        totalResults,
        completedResults,
        failedResults,
        averageConfidence
      ] = await Promise.all([
        OCRResult.count({ where: whereClause }),
        OCRResult.count({ where: { ...whereClause, status: 'completed' } }),
        OCRResult.count({ where: { ...whereClause, status: 'failed' } }),
        OCRResult.findAll({
          where: { ...whereClause, status: 'completed', confidence: { [require('sequelize').Op.ne]: null } },
          attributes: [[require('sequelize').fn('AVG', require('sequelize').col('confidence')), 'avg_confidence']],
          raw: true
        })
      ]);

      return {
        totalResults,
        completedResults,
        failedResults,
        successRate: totalResults > 0 ? Math.round((completedResults / totalResults) * 100) : 0,
        averageConfidence: averageConfidence[0]?.avg_confidence ?
          Math.round(averageConfidence[0].avg_confidence * 100) / 100 : 0,
        recentUploads: await this.getRecentUploads(userId)
      };
    } catch (error) {
      console.error('Error getting OCR statistics:', error);
      throw new Error('Failed to get OCR statistics');
    }
  }

  /**
   * Get recent uploads
   * @param {string} userId - User ID (optional)
   * @returns {Promise<array>} - Recent uploads
   */
  async getRecentUploads(userId = null) {
    try {
      const whereClause = userId ? { userId } : {};

      const recent = await OCRResult.findAll({
        where: whereClause,
        order: [['createdAt', 'DESC']],
        limit: 10,
        attributes: ['id', 'fileName', 'fileType', 'status', 'confidence', 'createdAt']
      });

      return recent;
    } catch (error) {
      console.error('Error getting recent uploads:', error);
      return [];
    }
  }

  /**
   * Export OCR results to CSV/JSON
   * @param {string} format - Export format ('csv' or 'json')
   * @param {object} filters - Filter options
   * @returns {Promise<string>} - Export data
   */
  async exportOCRResults(format = 'json', filters = {}) {
    try {
      const { results } = await this.getOCRResults(filters, 1, 1000); // Get all results

      if (format === 'csv') {
        return this.convertToCSV(results);
      } else {
        return JSON.stringify(results, null, 2);
      }
    } catch (error) {
      console.error('Error exporting OCR results:', error);
      throw new Error('Failed to export OCR results');
    }
  }

  /**
   * Convert results to CSV format
   * @param {array} results - OCR results
   * @returns {string} - CSV data
   */
  convertToCSV(results) {
    if (results.length === 0) return '';

    const headers = [
      'ID', 'File Name', 'File Type', 'Status', 'Confidence',
      'Emails', 'Phones', 'Dates', 'Names', 'Skills Count',
      'Created At', 'Processed At'
    ];

    const rows = results.map(result => [
      result.id,
      result.fileName,
      result.fileType,
      result.status,
      result.confidence || '',
      result.extractedData?.emails?.join('; ') || '',
      result.extractedData?.phones?.join('; ') || '',
      result.extractedData?.dates?.join('; ') || '',
      result.extractedData?.names?.join('; ') || '',
      result.extractedData?.skills?.length || 0,
      result.createdAt,
      result.processingCompletedAt || ''
    ]);

    return [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');
  }
}

module.exports = new OCRDataService();
