## Page 1

🧪 UAT Testing Scripts - HR AI Certification Portal
📋 User Acceptance Testing Documentation
✅ USER STORY IMPLEMENTATION STATUS
📊 SUMMARY
Test Case Distribution
🧪 TEST EXECUTION CHECKLIST
Phase 1: Authentication & User Management (US-001)
Phase 2: OCR & Admin Features (US-002)
Phase 3: Learning Platform (US-003)
Phase 4: Blog System (US-004)
Phase 5: Community Chat (US-005)
Phase 6: Manifesto Page (US-006)
Phase 7: Resources Library (US-007)
Phase 8: Copy Protection (US-008)
Phase 9: Watermarking (US-009)
📝 FINAL TEST SIGN-OFF
Overall Recommendation
🧪
UAT Testing Scripts - HR AI
Certification Portal
📋
User Acceptance Testing
Documentation
Document Version: 1.0
Last Updated: October 18, 2025
Status: 🟢 All 9 User Stories Ready for UAT
Test Environment: Staging/Production
✅
USER STORY IMPLEMENTATION
STATUS

## Page 2

ID Hungarian User Story Feature Status
US- Mint leendő tag, szeretnék egy egyszerű ✅
Authentication
001 regisztrációs oldalt használni... Implemented
Mint a portál adminisztrátora, szeretném a
US- OCR ✅
tagok feltöltött CV-jét automatikusan
002 Processing Implemented
digitalizálni (OCR-ezni)...
Mint felhasználó, szeretnék hozzáférni
US- Learning ✅
egy tanulós/vizsgázós részhez (online
003 Platform Implemented
learning platform)...
US- Mint felhasználó, szeretnék egy blog részt ✅
Blog System
004 böngészni... Implemented
US- Mint felhasználó, szeretnék egy ✅
Real-time Chat
005 közösségi/chat felületet használni... Implemented
US- Mint új tag, szeretném elolvasni a portál ✅
Static Content
006 manifesztóját (manifesto)... Implemented
Mint felhasználó, szeretnék elérni külsős
US- Resource ✅
szakmai/oktatási anyagokat (tréning
007 Library Implemented
material)...
Mint a tartalom tulajdonosa, szeretném
US- Content ✅
megakadályozni a dokumentumok
008 Protection Implemented
lemásolását (copy-paste)...
Mint a tartalom tulajdonosa, szeretném,
US- ✅
ha print screen esetén a háttérben vízjel Watermarking
009 Implemented
jelenne meg...
📊
SUMMARY
Total Test Cases: 51
User Stories Covered: 9/9 (100%)
Implementation Status: ✅ ALL IMPLEMENTED
Test Case Distribution

## Page 3

US-001 Registration: 6 test cases
US-002 OCR Processing: 8 test cases
US-003 Learning Platform: 8 test cases
US-004 Blog System: 5 test cases
US-005 Community Chat: 7 test cases
US-006 Manifesto: 3 test cases
US-007 Resources: 4 test cases
US-008 Copy Protection: 4 test cases
US-009 Watermarking: 5 test cases
🧪
TEST EXECUTION CHECKLIST
Phase 1: Authentication & User Management
(US-001)
Test ID Description Pass Fail Notes Tester Date
UAT-
Registration page accessibility [ ] [ ]
001-001
UAT- Form validation (empty, invalid
[ ] [ ]
001-002 email, weak password)
UAT- Successful registration with valid
[ ] [ ]
001-003 data
UAT-
Password reset email flow [ ] [ ]
001-004
UAT- JWT token management &
[ ] [ ]
001-005 storage
UAT- Password hashing security
[ ] [ ]
001-006 (bcrypt)
Phase 2: OCR & Admin Features (US-002)

## Page 4

Test ID Description Pass Fail Notes Tester Date
UAT-
OCR page admin-only access [ ] [ ]
002-001
UAT- Single CV PDF upload &
[ ] [ ]
002-002 processing
UAT-
Batch upload (multiple CVs) [ ] [ ]
002-003
UAT- OCR text extraction quality
[ ] [ ]
002-004 (>80%)
UAT- Structured data extraction
[ ] [ ]
002-005 (name, email, skills, etc.)
UAT- Error handling (invalid files, size
[ ] [ ]
002-006 limits)
UAT- OCR results review & manual
[ ] [ ]
002-007 correction interface
UAT- Queue statistics & real-time
[ ] [ ]
002-008 monitoring
Phase 3: Learning Platform (US-003)
Test ID Description Pass Fail Notes Tester Date
UAT-003-
Courses browsing & display [ ] [ ]
001
UAT-003-
Course search & filtering [ ] [ ]
002
UAT-003-
Course enrollment process [ ] [ ]
003
UAT-003- Lesson viewing & progress
[ ] [ ]
004 tracking
UAT-003-
Quiz system - taking quiz [ ] [ ]
005

## Page 5

Test ID Description Pass Fail Notes Tester Date
UAT-003-
Quiz scoring & results display [ ] [ ]
006
UAT-003- Course completion & certificate
[ ] [ ]
007 generation
UAT-003- Progress persistence after
[ ] [ ]
008 logout/login
Phase 4: Blog System (US-004)
Test ID Description Pass Fail Notes Tester Date
UAT-004- Blog page accessibility & article
[ ] [ ]
001 display
UAT-004- Blog search & filtering
[ ] [ ]
002 functionality
UAT-004-
Article reading & formatting [ ] [ ]
003
UAT-004- Content protection on blog
[ ] [ ]
004 articles
UAT-004-
Blog comments (if applicable) [ ] [ ]
005
Phase 5: Community Chat (US-005)
Test ID Description Pass Fail Notes Tester Date
UAT-005- Community page access &
[ ] [ ]
001 room list
UAT-005- Join chat room & view message
[ ] [ ]
002 history

## Page 6

Test ID Description Pass Fail Notes Tester Date
UAT-005-
Send chat message [ ] [ ]
003
UAT-005- Real-time message updates
[ ] [ ]
004 (WebSocket)
UAT-005- User presence & status
[ ] [ ]
005 indicators
UAT-005- Multiple rooms/channels
[ ] [ ]
006 switching
UAT-005- Message persistence across
[ ] [ ]
007 sessions
Phase 6: Manifesto Page (US-006)
Test ID Description Pass Fail Notes Tester Date
UAT-006-
Manifesto page accessibility [ ] [ ]
001
UAT-006- Manifesto content quality &
[ ] [ ]
002 completeness
UAT-006-
Public access without login [ ] [ ]
003
Phase 7: Resources Library (US-007)
Test ID Description Pass Fail Notes Tester Date
UAT-007- Resources page accessibility &
[ ] [ ]
001 categorization
UAT-007-
Resource download functionality [ ] [ ]
002

## Page 7

Test ID Description Pass Fail Notes Tester Date
UAT-007-
External links validation [ ] [ ]
003
UAT-007-
Resource filtering & search [ ] [ ]
004
Phase 8: Copy Protection (US-008)
Test ID Description Pass Fail Notes Tester Date
UAT-008- Copy-paste prevention (Ctrl+C
[ ] [ ]
001 disabled)
UAT-008- Right-click context menu
[ ] [ ]
002 prevention
UAT-008-
Image save-as prevention [ ] [ ]
003
UAT-008-
PDF download protection [ ] [ ]
004
Phase 9: Watermarking (US-009)
Test ID Description Pass Fail Notes Tester Date
UAT-009- Watermark visible on
[ ] [ ]
001 screenshots
UAT-009- Watermark customization
[ ] [ ]
002 (admin)
UAT-009-
Watermark on PDF exports [ ] [ ]
003
UAT-009-
User identification watermark [ ] [ ]
004

## Page 8

Test ID Description Pass Fail Notes Tester Date
UAT-009- Certificate watermark
[ ] [ ]
005 verification
📝
FINAL TEST SIGN-OFF
Total Tests Planned: 51
Tests Passed: _____ / 51
Tests Failed: _____ / 51
Pass Rate: _____%
Lead Tester: ____________________
QA Manager: ____________________
Project Manager: ____________________
Date: ____________
Overall Recommendation
✅ APPROVED FOR PRODUCTION - All tests passed
⚠ CONDITIONAL APPROVAL - Minor issues found
❌ NOT APPROVED - Critical issues found
Comments:
Document Version: 1.0 | Created: October 18, 2025 | Status: Ready for Testing
