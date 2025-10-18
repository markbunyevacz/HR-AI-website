# 📋 DETAILED UAT PROCEDURES - HR AI Certification Portal

## Complete User Acceptance Testing Guide

**Version:** 1.0  
**Created:** October 18, 2025  
**Status:** 🟢 Ready for Testing  

---

## 1️⃣ USER STORY: REGISTRATION & AUTHENTICATION (US-001)

**Hungarian:** Mint leendő tag, szeretnék egy egyszerű regisztrációs oldalt használni, amely mögött törzsadat kezelő van, hogy belépési adatokkal (jelszóemlékeztetővel) ellátott fiókom legyen.

### TEST 1.1: Registration Page Accessibility

**Test ID:** UAT-001-001  
**Objective:** Verify registration page is accessible and properly displays form

**Preconditions:**
- Browser open (Chrome/Firefox/Safari)
- No user logged in
- Application URL available

**Steps:**
1. Navigate to application home page
2. Click "Register" or "Get Started" button
3. Wait for page to load
4. Verify URL changes to `/register`
5. Check form elements load: Email, Password, Confirm Password, Full Name
6. Verify Submit and Login link are visible

**Expected Results:**
- ✅ Registration page loads within 3 seconds
- ✅ All form fields visible and properly labeled
- ✅ Submit button is enabled
- ✅ "Already have an account?" link with Login option present

**Pass Criteria:** All expected results achieved

---

### TEST 1.2: Registration Form Validation

**Test ID:** UAT-001-002  
**Objective:** Verify form validation for all fields

**Test Cases:**

**Case A: Empty Form Submission**
- Click Submit without entering data
- Expected: Error messages for all fields: "This field is required"

**Case B: Invalid Email**
- Email: "notanemail" (no @)
- Expected: Error: "Please enter a valid email address"

**Case C: Weak Password**
- Password: "123" (< 8 chars)
- Expected: Error: "Password must be at least 8 characters"

**Case D: Password Mismatch**
- Password: "SecurePass123"
- Confirm: "SecurePass456"
- Expected: Error: "Passwords do not match"

**Pass Criteria:** All validation errors display correctly

---

### TEST 1.3: Successful Registration

**Test ID:** UAT-001-003  
**Objective:** Verify user can successfully register

**Test Data:**
```
Email: testuser_uat_001_${DATE_TIMESTAMP}@testdomain.com
Password: TestPassword123!
Confirm: TestPassword123!
Full Name: UAT Test User
```

**Steps:**
1. Fill all form fields with valid data
2. Click Submit button
3. Observe loading indicator
4. Wait for response (< 5 seconds)

**Expected Results:**
- ✅ Success message: "Registration successful! Please log in."
- ✅ User redirected to login page
- ✅ Verification email sent to provided email address
- ✅ User record created in database with hashed password

**Pass Criteria:** User can log in with new credentials

---

### TEST 1.4: Password Reset Flow

**Test ID:** UAT-001-004  
**Objective:** Verify password reset via email

**Steps:**
1. On login page, click "Forgot Password?"
2. Enter registered email address
3. Click "Send Reset Link"
4. Check email inbox (may be in spam)
5. Click reset link in email
6. Enter new password: "NewPassword456!"
7. Confirm password: "NewPassword456!"
8. Click "Reset Password"

**Expected Results:**
- ✅ Reset email received within 2 minutes
- ✅ Reset link valid for 24 hours
- ✅ Reset form loads after clicking link
- ✅ Success: "Password reset successfully"
- ✅ Can log in with new password
- ✅ Old password no longer works

**Pass Criteria:** User successfully resets password and logs in

---

### TEST 1.5: JWT Token Management

**Test ID:** UAT-001-005  
**Objective:** Verify JWT token handling and security

**Steps:**
1. Log in successfully with valid credentials
2. Open DevTools: F12 → Application/Storage tab
3. Check localStorage for token
4. Copy token value and verify format
5. Navigate to protected page
6. Verify page loads (token valid)
7. Manually delete token from localStorage
8. Refresh page
9. Verify redirect to login

**Expected Results:**
- ✅ Token stored in localStorage with key "authToken"
- ✅ Token format: `xxxxx.yyyyy.zzzzz` (JWT structure)
- ✅ Token removed after logout
- ✅ Protected pages require valid token
- ✅ Invalid/expired tokens redirect to login

**Pass Criteria:** JWT token properly stored and validated

---

### TEST 1.6: Password Security (Bcrypt Hashing)

**Test ID:** UAT-001-006  
**Objective:** Verify passwords are properly hashed in database

**Prerequisites:**
- Database access (admin/test environment only)
- User registered in previous tests

**Steps:**
1. Connect to database using admin credentials
2. Query: `SELECT email, password FROM users LIMIT 5`
3. Examine password field values
4. Verify password starts with `$2b$` (bcrypt signature)
5. Copy password hash
6. Verify hash length (~60 characters)
7. Try to log in using hash as password (should fail)
8. Log in with original plain password (should succeed)

**Expected Results:**
- ✅ Passwords stored as bcrypt hashes (not plain text)
- ✅ All hashes start with `$2b$`
- ✅ Hash format: `$2b$cost$hashedpassword`
- ✅ Cannot reverse-engineer password from hash
- ✅ Plain passwords work for login

**Pass Criteria:** All password security checks pass

---

## 2️⃣ USER STORY: ADMIN OCR DIGITALIZATION (US-002)

**Hungarian:** Mint a portál adminisztrátora, szeretném a tagok feltöltött CV-jét automatikusan digitalizálni (OCR-ezni), hogy az adataikat digitális formátumba rántsam.

### TEST 2.1: OCR Upload Page Access Control

**Test ID:** UAT-002-001  
**Objective:** Verify OCR page requires admin role

**Steps:**

**Part A: Regular User Access**
1. Log in as regular user (role: "user")
2. Navigate to `/admin/ocr`
3. Observe response

**Expected:**
- ✅ Error message: "403 Forbidden - Admin access required"
- ✅ Redirect to dashboard or error page

**Part B: Admin Access**
1. Log out regular user
2. Log in as admin (role: "admin")
3. Navigate to `/admin/ocr`
4. Wait for page load

**Expected:**
- ✅ OCR page loads successfully
- ✅ Upload area visible
- ✅ Job list table visible
- ✅ Queue statistics widget visible

**Pass Criteria:** Access control properly enforced

---

### TEST 2.2: Single CV Upload & Processing

**Test ID:** UAT-002-002  
**Objective:** Verify single file upload and OCR processing

**Test File:**
- Filename: `sample_cv.pdf`
- Size: 2-5 MB
- Format: PDF
- Content: Typical HR professional CV

**Steps:**
1. On OCR admin page, click upload area
2. Select test PDF file
3. Verify filename displays in upload widget
4. Click "Upload" or "Process" button
5. Observe loading indicator
6. Wait for job to appear in list
7. Monitor status: "Processing" → "Completed"
8. Click on completed job to view results

**Expected Results:**
- ✅ File uploads successfully
- ✅ File validation passes
- ✅ Job created with unique ID
- ✅ Processing starts immediately
- ✅ Status updates in real-time
- ✅ Processing completes within 30 seconds
- ✅ Results available for viewing

**Pass Criteria:** File uploads and processes successfully

---

### TEST 2.3: Batch Upload (Multiple CVs)

**Test ID:** UAT-002-003  
**Objective:** Verify batch processing of multiple files

**Test Files:**
- Count: 5 different PDFs
- Sizes: 1-3 MB each
- Total: < 50 MB

**Steps:**
1. Click upload area
2. Select all 5 files simultaneously
3. Verify all files appear in queue
4. Click "Upload All" or "Batch Process"
5. Monitor batch job progress
6. Wait for all individual jobs to complete

**Expected Results:**
- ✅ All files upload (max 10 supported)
- ✅ Batch job created with parent ID
- ✅ Individual job for each file
- ✅ Progress shown per file (percentage)
- ✅ Average processing time: 20-30 sec per file
- ✅ All jobs show status "Completed"

**Pass Criteria:** Batch processing works efficiently

---

### TEST 2.4: OCR Extraction Accuracy

**Test ID:** UAT-002-004  
**Objective:** Verify text extraction quality and accuracy

**Verification Steps:**
1. View processed OCR result
2. Compare extracted text with original PDF
3. Check accuracy of:
   - Full Name: _____ (% accurate)
   - Email: _____ (% accurate)
   - Phone: _____ (% accurate)
   - Experience dates: _____ (% accurate)
   - Skills identified: _____ (% accurate)
4. Note confidence score displayed

**Quality Standards:**
- ✅ Name extraction: 100% match
- ✅ Email format: Valid email format
- ✅ Phone numbers: Valid format
- ✅ Dates: Proper date format
- ✅ Overall confidence score: ≥ 80%

**Pass Criteria:** Extraction accuracy meets standards

---

### TEST 2.5: Structured Data Extraction

**Test ID:** UAT-002-005  
**Objective:** Verify structured data parsing

**Data Fields to Verify:**
- Full Name (extracted)
- Email(s) (all extracted)
- Phone(s) (all extracted)
- Skills (categorized list)
- Education (degree, school, year)
- Experience (positions, companies, dates)
- Summary/Objective (if present)
- Keywords identified

**Expected Results:**
- ✅ All fields properly extracted
- ✅ Data categorized correctly
- ✅ Dates formatted consistently (YYYY-MM-DD)
- ✅ Skills shown as comma-separated list
- ✅ No duplicate data
- ✅ Sensitive data handled appropriately

**Pass Criteria:** All structured data extracted correctly

---

### TEST 2.6: Error Handling

**Test ID:** UAT-002-006  
**Objective:** Verify error handling for various file issues

**Test Scenarios:**

**Scenario A: Invalid File Format**
- Upload: `.txt` file disguised as `.pdf`
- Expected: Error message "Invalid file format"

**Scenario B: File Too Large**
- Upload: File > 10 MB
- Expected: Error message "File exceeds maximum size (10 MB)"

**Scenario C: Corrupted PDF**
- Upload: Corrupted/invalid PDF file
- Expected: Error message "Could not process file"

**Scenario D: Scanned Document**
- Upload: Low-quality scanned image
- Expected: Processes but confidence score < 70%

**Pass Criteria:** All errors handled gracefully

---

### TEST 2.7: Results Review Interface

**Test ID:** UAT-002-007  
**Objective:** Verify OCR results can be reviewed and corrected

**Steps:**
1. Navigate to OCR Results page
2. View list of all processed jobs
3. Test filtering: By Status (Completed, Error, Pending)
4. Test search: Search by filename or email
5. Click on a result to view details
6. Verify data fields are editable
7. Edit one field (e.g., name)
8. Click Save
9. Verify changes persisted

**Expected Results:**
- ✅ Results list displays all jobs
- ✅ Filters work correctly
- ✅ Search returns relevant results
- ✅ Can view full extracted data
- ✅ Can manually correct extracted data
- ✅ Changes saved to database
- ✅ Edit history tracked

**Pass Criteria:** Results review and correction works

---

### TEST 2.8: Queue Monitoring

**Test ID:** UAT-002-008  
**Objective:** Verify real-time queue statistics

**Steps:**
1. Submit multiple OCR jobs
2. View queue statistics dashboard
3. Check displayed metrics:
   - Total jobs in queue
   - Jobs by status (Pending, Processing, Completed, Failed)
   - Average processing time
   - Current processing job
4. Monitor real-time updates (refresh every 5 seconds)
5. Let jobs complete and watch status change

**Expected Results:**
- ✅ Statistics accurately reflect job counts
- ✅ Real-time updates without manual refresh
- ✅ Status breakdown shows all categories
- ✅ Processing doesn't cause system lag
- ✅ Queue processes jobs efficiently

**Pass Criteria:** Queue monitoring works correctly

---

## 3️⃣ USER STORY: LEARNING PLATFORM (US-003)

**Hungarian:** Mint felhasználó, szeretnék hozzáférni egy tanulós/vizsgázós részhez (online learning platform), hogy a CAHIS™ tananyagot elvégezhessem és vizsgázhassak.

### TEST 3.1: Browse Courses

**Test ID:** UAT-003-001  
**Objective:** Verify courses are displayed properly

**Steps:**
1. Log in as regular user
2. Click "Courses" in menu
3. Navigate to `/courses`
4. Wait for page load

**Verify Displayed:**
- Course grid/list layout
- For each course:
  - [ ] Course title
  - [ ] Course description (100-200 chars)
  - [ ] Instructor name
  - [ ] Category badge
  - [ ] Level (Beginner/Intermediate/Advanced)
  - [ ] Course image/thumbnail
  - [ ] "View" or "Enroll" button

**Expected Results:**
- ✅ Page loads within 3 seconds
- ✅ All courses display with complete info
- ✅ Images load without errors
- ✅ Responsive layout on mobile
- ✅ Pagination or infinite scroll works

**Pass Criteria:** Courses display correctly

---

### TEST 3.2: Course Search & Filtering

**Test ID:** UAT-003-002  
**Objective:** Verify search and filter functionality

**Tests:**

**Search Test:**
- Search term: "CAHIS"
- Expected: Only CAHIS courses shown

**Category Filter:**
- Filter: "HR Management"
- Expected: Only HR Management courses shown

**Level Filter:**
- Filter: "Intermediate"
- Expected: Only Intermediate level courses shown

**Combined Filters:**
- Category: "HR" + Level: "Intermediate"
- Expected: Courses matching both filters

**Pass Criteria:** All search and filter functions work

---

### TEST 3.3: Course Enrollment

**Test ID:** UAT-003-003  
**Objective:** Verify enrollment process

**Steps:**
1. Select an available course
2. Click "Enroll" button
3. If payment required: complete payment
4. Click "Confirm" enrollment
5. Wait for confirmation

**Expected Results:**
- ✅ Course added to user's "My Courses"
- ✅ Success message displayed
- ✅ Progress initialized to 0%
- ✅ Can access course content
- ✅ User added to course participant list

**Pass Criteria:** User successfully enrolls in course

---

### TEST 3.4: Complete Lesson & Track Progress

**Test ID:** UAT-003-004  
**Objective:** Verify lesson completion and progress tracking

**Steps:**
1. Enter enrolled course
2. View lesson list (sidebar/menu)
3. Click Lesson 1
4. Wait for lesson content to load
5. Read/watch all lesson content
6. Scroll to bottom
7. Click "Mark as Complete"
8. Verify completion confirmed
9. Check progress bar updated
10. Proceed to Lesson 2

**Expected Results:**
- ✅ Lesson loads with all content (text, video, resources)
- ✅ Can complete lesson
- ✅ Progress updates (e.g., 1/10 lessons)
- ✅ Cannot complete without viewing min content
- ✅ Completion tracked in database
- ✅ Can resume where left off

**Pass Criteria:** Lesson completion works and progress tracked

---

### TEST 3.5: Quiz System

**Test ID:** UAT-003-005  
**Objective:** Verify quiz taking functionality

**Steps:**
1. Navigate to course quiz section
2. Click "Take Quiz"
3. Review quiz instructions
4. Start quiz (if timed, observe timer)
5. Answer all questions
6. Review answers (if allowed)
7. Click "Submit Quiz"
8. Wait for scoring

**Question Types to Test:**
- Multiple choice
- True/False
- Short answer (if applicable)
- Multiple selection

**Expected Results:**
- ✅ Quiz interface user-friendly
- ✅ All questions display properly
- ✅ Can select/type answers
- ✅ Navigation between questions works
- ✅ Timer counts down accurately (if timed)
- ✅ Submit button disabled if incomplete
- ✅ Score calculated correctly

**Pass Criteria:** Quiz system works correctly

---

### TEST 3.6: Quiz Results & Scoring

**Test ID:** UAT-003-006  
**Objective:** Verify quiz results accuracy

**Answers to Verify:**
- 3 correct answers
- 2 incorrect answers
- 1 partially correct (if applicable)

**Expected Results:**
- ✅ Score displays: X/Y questions correct
- ✅ Percentage shown: ~60% (3/5 correct)
- ✅ Pass/Fail status correct (if ≥70% = pass)
- ✅ Detailed review shows:
  - Your answer vs Correct answer
  - Explanation for each question
- ✅ Can retake quiz (max 3 attempts)
- ✅ Score saved in database

**Pass Criteria:** Scoring is accurate and can retake

---

### TEST 3.7: Certificate Generation

**Test ID:** UAT-003-007  
**Objective:** Verify certificate auto-generation upon course completion

**Prerequisites:**
- Complete all course lessons (100% progress)
- Pass final quiz (score ≥ 70%)

**Steps:**
1. Check course progress = 100%
2. Verify completion badge appears
3. Check notification about certificate
4. Navigate to "My Certificates"
5. Verify certificate appears

**Certificate Should Display:**
- ✅ Course name
- ✅ User name
- ✅ Issue date
- ✅ Certificate number/ID
- ✅ Digital signature
- ✅ Expiration date (if applicable)

**Actions:**
- ✅ Download as PDF
- ✅ Share certificate link
- ✅ Verify certificate authenticity

**Pass Criteria:** Certificate generated and downloadable

---

### TEST 3.8: Progress Persistence

**Test ID:** UAT-003-008  
**Objective:** Verify progress saved across sessions

**Steps:**
1. Complete 3 lessons (30% progress)
2. Note current progress
3. Log out completely
4. Wait 5 minutes
5. Log back in
6. Navigate to same course
7. Check progress still shows 30%
8. Verify completed lessons marked complete

**Expected Results:**
- ✅ Progress persists after logout
- ✅ Can resume from where left off
- ✅ All previous work intact
- ✅ No data loss
- ✅ Timestamps accurate

**Pass Criteria:** Progress saved and restored correctly

---

## 4️⃣ USER STORY: BLOG SYSTEM (US-004)

**Hungarian:** Mint felhasználó, szeretnék egy blog részt böngészni, ahol szakmai cikkek és esettanulmányok találhatóak.

### TEST 4.1: Blog Page Accessibility

**Test ID:** UAT-004-001  
**Objective:** Verify blog page displays articles

**Steps:**
1. Navigate to Blog page
2. Observe article display

**Expected Results:**
- ✅ Blog page loads quickly
- ✅ Articles displayed in list/grid format
- ✅ Each article shows: Title, Image, Author, Date, Category, Excerpt
- ✅ Images load without 404 errors
- ✅ Responsive on mobile devices

**Pass Criteria:** Blog page displays correctly

---

### TEST 4.2: Blog Search & Filter

**Test ID:** UAT-004-002  
**Objective:** Verify search and filtering work

**Tests:**
- Search "AI": Returns relevant articles
- Filter Category "Case Studies": Shows only case studies
- Filter Author "John Doe": Shows articles by author
- Combine filters: Shows articles matching all criteria

**Expected Results:**
- ✅ Search returns relevant results
- ✅ Filters work correctly
- ✅ Multiple filters can combine
- ✅ "Clear Filters" button available

**Pass Criteria:** Search and filters work

---

### TEST 4.3: Article Reading

**Test ID:** UAT-004-003  
**Objective:** Verify article displays properly

**Steps:**
1. Click on article title
2. Wait for article to load
3. Verify content displays: Title, Author, Date, Body
4. Scroll through full article
5. Check images and formatting

**Expected Results:**
- ✅ Article loads within 3 seconds
- ✅ All content readable and formatted
- ✅ Images display correctly
- ✅ Links are clickable
- ✅ Mobile view responsive

**Pass Criteria:** Article displays correctly

---

### TEST 4.4: Content Protection on Blog

**Test ID:** UAT-004-004  
**Objective:** Verify copy protection on blog articles

**Tests:**
- Right-click text: Context menu disabled
- Ctrl+C: Copy blocked
- Select text: May be disabled or watermarked
- Screenshot: Watermark visible

**Expected Results:**
- ✅ Copy functionality blocked
- ✅ User sees "Content is protected" message
- ✅ Content cannot be easily copied

**Pass Criteria:** Content protection works

---

## 5️⃣ USER STORY: COMMUNITY CHAT (US-005)

**Hungarian:** Mint felhasználó, szeretnék egy közösségi/chat felületet használni (community page/chat), hogy más certified szakemberekkel folyamatosan kapcsolatban lehessek.

### TEST 5.1: Access Community Chat

**Test ID:** UAT-005-001  
**Objective:** Verify chat page accessible

**Steps:**
1. Click "Community" in menu
2. Navigate to `/community` or `/chat`
3. Wait for page load

**Expected Results:**
- ✅ Chat interface loads
- ✅ Available rooms/channels displayed
- ✅ User list shows online members
- ✅ Message area ready for interaction

**Pass Criteria:** Chat page accessible

---

### TEST 5.2: Join Chat Room & View History

**Test ID:** UAT-005-002  
**Objective:** Verify can join room and see message history

**Steps:**
1. Click on room (e.g., "General")
2. Wait for room to load
3. Observe message history
4. Check member list

**Expected Results:**
- ✅ Room opens successfully
- ✅ Message history displays (50+ recent)
- ✅ Members listed with status
- ✅ Can see timestamps

**Pass Criteria:** Room joins and history displays

---

### TEST 5.3: Send Chat Message

**Test ID:** UAT-005-003  
**Objective:** Verify message sending works

**Steps:**
1. In active room, click message input
2. Type message: "Testing chat system"
3. Press Enter or click Send
4. Observe message in chat

**Expected Results:**
- ✅ Message appears immediately
- ✅ Shows: Your name, avatar, message, timestamp
- ✅ Special characters work
- ✅ Emoji support (if applicable)

**Pass Criteria:** Messages send successfully

---

### TEST 5.4: Real-time Updates

**Test ID:** UAT-005-004  
**Objective:** Verify real-time message delivery

**Setup:** Two browsers open, same room

**Steps:**
1. User A viewing room
2. User B sends message
3. Observe message appears on User A's screen immediately

**Expected Results:**
- ✅ Message appears within 1 second
- ✅ No page refresh needed
- ✅ WebSocket connection stable
- ✅ Scales for multiple users

**Pass Criteria:** Real-time updates work

---

### TEST 5.5: User Presence & Status

**Test ID:** UAT-005-005  
**Objective:** Verify online/offline status

**Steps:**
1. Check member list - all show "Online"
2. Log out one user
3. Check their status changes to "Offline"
4. Verify "Last seen" timestamp

**Expected Results:**
- ✅ Status updates in real-time
- ✅ Green dot = Online, Red dot = Offline
- ✅ Last seen timestamp accurate

**Pass Criteria:** Presence tracking works

---

### TEST 5.6: Multiple Rooms

**Test ID:** UAT-005-006  
**Objective:** Verify can switch between rooms

**Steps:**
1. In "General" room, send message
2. Switch to "HR Strategy" room
3. Check history is different
4. Send message in room 2
5. Switch back to General
6. Verify original message still there

**Expected Results:**
- ✅ Can switch rooms
- ✅ Message history per room
- ✅ Members list updates
- ✅ Messages don't mix

**Pass Criteria:** Room switching works

---

### TEST 5.7: Message Persistence

**Test ID:** UAT-005-007  
**Objective:** Verify messages persist after logout

**Steps:**
1. Send message: "Persistence test"
2. Log out
3. Log back in
4. Go to same room
5. Scroll through history

**Expected Results:**
- ✅ Message still visible
- ✅ Timestamp unchanged
- ✅ Complete history available
- ✅ No data loss

**Pass Criteria:** Messages persist

---

## 6️⃣ USER STORY: MANIFESTO PAGE (US-006)

**Hungarian:** Mint új tag, szeretném elolvasni a portál manifesztóját (manifesto), hogy megértsem a közösség alapelveit.

### TEST 6.1: Manifesto Accessibility

**Test ID:** UAT-006-001  
**Objective:** Verify manifesto page public and accessible

**Steps:**
1. Find "Manifesto" link (footer/menu)
2. Click manifesto link
3. Verify page loads

**Expected Results:**
- ✅ Accessible without login
- ✅ Page loads quickly
- ✅ Mobile responsive

**Pass Criteria:** Page accessible

---

### TEST 6.2: Manifesto Content

**Test ID:** UAT-006-002  
**Objective:** Verify content quality and completeness

**Content Should Include:**
- ✅ Mission statement
- ✅ Core values/principles (5+)
- ✅ Community commitment
- ✅ Professional standards
- ✅ Diversity statement

**Quality Checks:**
- ✅ Professional tone
- ✅ No spelling/grammar errors
- ✅ Well-formatted
- ✅ Inspiring and clear

**Pass Criteria:** Content complete and quality

---

## 7️⃣ USER STORY: RESOURCES/TRAINING (US-007)

**Hungarian:** Mint felhasználó, szeretnék elérni külsős szakmai/oktatási anyagokat (tréning material), hogy kiegészítik a certifikáció alapanyagát.

### TEST 7.1: Resources Page

**Test ID:** UAT-007-001  
**Objective:** Verify resources accessible

**Steps:**
1. Click "Resources" in menu
2. Verify page loads

**Expected Results:**
- ✅ Resources organized by category
- ✅ Multiple resource types visible
- ✅ Complete list displayed

**Pass Criteria:** Page loads correctly

---

### TEST 7.2: Resource Download

**Test ID:** UAT-007-002  
**Objective:** Verify can download resources

**Steps:**
1. Click on a resource
2. Click Download button
3. Save file to computer
4. Verify file integrity

**Expected Results:**
- ✅ File downloads successfully
- ✅ File not corrupted
- ✅ File size matches expected

**Pass Criteria:** Download works

---

### TEST 7.3: External Links

**Test ID:** UAT-007-003  
**Objective:** Verify external links work

**Steps:**
1. Click external link
2. Verify opens in new tab
3. Check site loads

**Expected Results:**
- ✅ Links work
- ✅ No 404 errors
- ✅ Trusted sources

**Pass Criteria:** External links valid

---

### TEST 7.4: Resource Filtering

**Test ID:** UAT-007-004  
**Objective:** Verify filters work

**Tests:**
- Filter by Type (PDF, Video, etc.)
- Filter by Category
- Combine multiple filters

**Expected Results:**
- ✅ Filters work correctly
- ✅ Results accurate

**Pass Criteria:** Filtering works

---

## 8️⃣ USER STORY: COPY PROTECTION (US-008)

**Hungarian:** Mint a tartalom tulajdonosa, szeretném megakadályozni a dokumentumok lemásolását (copy-paste)...

### TEST 8.1: Copy-Paste Prevention

**Test ID:** UAT-008-001  
**Steps:**
1. Try to select text in protected area
2. Try Ctrl+C
3. Try right-click Copy

**Expected Results:**
- ✅ Copy blocked
- ✅ Protection message shown

**Pass Criteria:** Copy prevented

---

### TEST 8.2: Right-Click Prevention

**Test ID:** UAT-008-002  
**Steps:**
1. Right-click on content
2. Verify context menu disabled

**Expected Results:**
- ✅ Context menu blocked
- ✅ Custom message shown

**Pass Criteria:** Right-click disabled

---

### TEST 8.3: Image Protection

**Test ID:** UAT-008-003  
**Steps:**
1. Try right-click on image: "Save image as"
2. Try drag image to desktop
3. Try Ctrl+C to copy

**Expected Results:**
- ✅ All blocked
- ✅ Image protected

**Pass Criteria:** Image protected

---

### TEST 8.4: PDF Protection

**Test ID:** UAT-008-004  
**Steps:**
1. View protected PDF
2. Try to save/download
3. Try Ctrl+S

**Expected Results:**
- ✅ Cannot save locally
- ✅ Can only view

**Pass Criteria:** PDF protected

---

## 9️⃣ USER STORY: WATERMARKING (US-009)

**Hungarian:** Mint a tartalom tulajdonosa, szeretném, ha print screen esetén a háttérben vízjel jelenne meg...

### TEST 9.1: Watermark Visibility

**Test ID:** UAT-009-001  
**Steps:**
1. View protected content
2. Take screenshot (Print Screen)
3. Open screenshot in image editor
4. Check watermark visible

**Expected Results:**
- ✅ Watermark visible
- ✅ Text readable (e.g., "CONFIDENTIAL")
- ✅ Doesn't block content
- ✅ Appears on all screenshots

**Pass Criteria:** Watermark visible

---

### TEST 9.2: Watermark Customization

**Test ID:** UAT-009-002  
**Steps (Admin):**
1. Access watermark settings
2. Change text/opacity/font
3. Save changes
4. Verify new watermark on content

**Expected Results:**
- ✅ Customizable
- ✅ Changes applied
- ✅ All content updated

**Pass Criteria:** Customization works

---

### TEST 9.3: PDF Watermark

**Test ID:** UAT-009-003  
**Steps:**
1. Export content as PDF
2. Download PDF
3. Open in viewer
4. Check watermark on PDF

**Expected Results:**
- ✅ Watermark embedded
- ✅ Visible in PDF
- ✅ Cannot be easily removed

**Pass Criteria:** PDF watermarked

---

### TEST 9.4: User ID Watermark

**Test ID:** UAT-009-004  
**Steps (Advanced):**
1. Take screenshot
2. Check watermark includes user info
3. Verify timestamp included

**Expected Results:**
- ✅ User email/ID in watermark
- ✅ Timestamp accurate
- ✅ Deters unauthorized sharing

**Pass Criteria:** User identification watermark works

---

### TEST 9.5: Certificate Watermark

**Test ID:** UAT-009-005  
**Steps:**
1. View certificate
2. Take screenshot
3. Check watermark visible
4. Download as PDF
5. Verify watermark on PDF
6. Try printing - watermark visible

**Expected Results:**
- ✅ Watermark on all formats
- ✅ Certificate authenticity protected
- ✅ Forgery prevented

**Pass Criteria:** Certificate protected

---

## ✅ TEST COMPLETION & SIGN-OFF

**Total Test Cases:** 51  
**Executed:** ______  
**Passed:** ______  
**Failed:** ______  
**Pass Rate:** _____%  

### Sign-Off

**Lead Tester:** ____________________  
**Date:** ____________

**QA Manager:** ____________________  
**Date:** ____________

**Recommendation:** [ ] APPROVED [ ] CONDITIONAL [ ] REJECTED

---

**Status:** 🟢 All tests ready for execution  
**Document Version:** 1.0
