# HR AI Portal - Certificates Feature Guide

## Overview

The Certificates feature allows users to earn and manage digital certificates upon completing courses. This system includes functionality for users to view their certificates, verify certificates, and for admins to issue demo certificates for testing.

## Feature Components

### 1. User Certificate Management
- **View Certificates**: Users can view all their earned certificates on the `/certificates` page
- **Certificate Details**: Each certificate displays:
  - Certificate number
  - Course title and category
  - Issue date and expiration date
  - Verification code for authentication
  - Active/Expired status

### 2. Certificate Issuance

#### Regular Certificate Issuance (Production)
```bash
POST /api/certificates/issue
Authorization: Bearer {token}
Content-Type: application/json

{
  "courseId": "uuid-of-course"
}
```

**Requirements:**
- Course must be completed by the user
- All quizzes in the course must be passed
- User can only receive one certificate per course

**Response:**
```json
{
  "success": true,
  "message": "Certificate issued successfully",
  "data": {
    "id": "uuid",
    "certificateNumber": "CERT-XXXXX-XXXXX",
    "verificationCode": "XXXXXX",
    "issuedAt": "2024-10-22T00:00:00Z",
    "expiresAt": "2027-10-22T00:00:00Z"
  }
}
```

#### Demo Certificate Issuance (For Testing)
```bash
POST /api/certificates/demo/issue
Authorization: Bearer {token}
Content-Type: application/json

{
  "courseId": "uuid-of-course",
  "userId": "uuid-of-user (optional, defaults to current user)"
}
```

**Requirements:**
- User must be logged in (authenticated)
- Instructor or Admin role (recommended)
- Course must exist in the database

**Features:**
- Bypasses eligibility checks (no need to complete course)
- Perfect for demo, testing, and UI development
- Used in the Certificates page empty state to show sample certificates

### 3. Certificate Verification

**Public Endpoint - No Authentication Required**
```bash
GET /api/certificates/verify/{verificationCode}
```

**Response:**
```json
{
  "success": true,
  "message": "Certificate verified",
  "data": {
    "number": "CERT-XXXXX-XXXXX",
    "issuedAt": "2024-10-22T00:00:00Z",
    "expiresAt": "2027-10-22T00:00:00Z",
    "user": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com"
    },
    "course": {
      "title": "Course Title",
      "category": "Category"
    }
  }
}
```

### 4. Course Statistics

**Admin/Instructor Only**
```bash
GET /api/certificates/stats/course/{courseId}
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalEnrolled": 150,
    "totalCompleted": 45,
    "averageProgress": 67,
    "completionRate": 30
  }
}
```

## Frontend Implementation

### Certificates Page

Located at: `HR-AI-Portal/frontend/src/pages/Certificates.jsx`

**Features:**
- Displays user's earned certificates in a grid layout
- Shows certificate details: number, dates, verification code
- Download certificate button (placeholder)
- Copy verification code to clipboard
- Empty state with "Get Demo Certificate" button for testing

**Demo Certificate Button:**
- Visible when no certificates exist
- Automatically selects the first available course
- Issues a demo certificate for immediate display
- Refreshes certificate list on success

### Styling

Located at: `HR-AI-Portal/frontend/src/styles/Certificates.css`

**New Classes:**
- `.empty-state-actions`: Container for action buttons in empty state
- `.btn-demo`: Styled button for demo certificate issuance with gradient background

## Database Schema

### Certificates Table
```sql
CREATE TABLE certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  userId UUID NOT NULL REFERENCES users(id),
  courseId UUID NOT NULL REFERENCES courses(id),
  certificateNumber VARCHAR(255) UNIQUE NOT NULL,
  verificationCode VARCHAR(255) UNIQUE NOT NULL,
  issuedAt TIMESTAMP DEFAULT NOW(),
  expiresAt TIMESTAMP,
  pdfUrl VARCHAR(255),
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW(),
  
  CONSTRAINT unique_user_course UNIQUE(userId, courseId),
  INDEX idx_userId (userId),
  INDEX idx_courseId (courseId),
  INDEX idx_verificationCode (verificationCode)
);
```

## Certificate Lifecycle

### 1. Issuance
- Triggered after course completion and quiz passing
- OR manually via admin demo endpoint
- Generates unique certificate number and verification code
- Sets expiration date to 3 years from issuance

### 2. Display
- Users view on certificates page
- Shows status: Active or Expired based on expiration date
- Can copy verification code for sharing

### 3. Verification
- Anyone can verify a certificate using verification code
- Shows certificate details and user information
- Validates expiration status

### 4. Expiration
- Certificates expire 3 years after issuance
- Expired certificates still display but marked as "Expired"
- Verification returns "Certificate has expired" message

## How to Test

### 1. Test Demo Certificate Issuance
```bash
# In your terminal at HR-AI-Portal/backend:
npm start

# Then navigate to /certificates page
# Click "Get Demo Certificate" button
# Certificate should appear in the list
```

### 2. Test Certificate Verification
```bash
# Navigate to public URL:
https://[domain]/certificates/verify/{verificationCode}

# Should display certificate details
```

### 3. Test Admin Certificate Issuance
```bash
# Using curl or Postman:
curl -X POST http://localhost:5000/api/certificates/demo/issue \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "courseId": "course-uuid",
    "userId": "user-uuid"
  }'
```

## API Rate Limiting

All certificate endpoints are subject to:
- **Rate Limit**: 100 requests per minute per IP
- **Auth Limiter**: 5 requests per 15 minutes for auth endpoints
- **CORS**: Enabled for configured origins

## Security Considerations

1. **Authentication**: All user-specific endpoints require valid JWT token
2. **Authorization**: Demo certificates require instructor/admin role
3. **Verification**: Public endpoint allows anyone to verify a certificate
4. **Data Validation**: Certificate data is validated before storage
5. **Database Indexing**: Optimized queries for performance

## Future Enhancements

1. **PDF Generation**: Generate downloadable certificate PDFs
2. **Email Notifications**: Notify users when certificates are issued
3. **Certificate Templates**: Customizable certificate designs per course
4. **Batch Issuance**: Issue certificates to multiple users
5. **Certificate Revocation**: Admin ability to revoke certificates
6. **Blockchain Verification**: Optional blockchain-based verification

## Troubleshooting

### Issue: "Failed to load certificates"
- **Solution**: Ensure user is authenticated with valid JWT token
- **Solution**: Check database connection

### Issue: "Certificate already issued for this course"
- **Solution**: User has already received a certificate for this course
- **Solution**: Delete the existing certificate from database if testing

### Issue: Demo certificate button not appearing
- **Solution**: Ensure courses exist in database (run seed-data.js)
- **Solution**: Check user is authenticated

## Related Files

- Backend Routes: `HR-AI-Portal/backend/src/routes/certificates.js`
- Backend Service: `HR-AI-Portal/backend/src/services/certificateService.js`
- Backend Model: `HR-AI-Portal/backend/src/models/Certificate.js`
- Frontend Component: `HR-AI-Portal/frontend/src/pages/Certificates.jsx`
- Styling: `HR-AI-Portal/frontend/src/styles/Certificates.css`
