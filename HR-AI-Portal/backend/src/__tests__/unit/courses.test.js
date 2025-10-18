const request = require('supertest');
const app = require('../../app');
const { Course, User } = require('../../models');

jest.mock('../../models');

describe('Course Endpoints', () => {
  const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsInJvbGUiOiJ1c2VyIn0';
  const mockAuthHeader = { Authorization: `Bearer ${mockToken}` };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/courses', () => {
    it('should retrieve courses with pagination', async () => {
      const mockCourses = [
        { id: '1', title: 'React Basics', category: 'Frontend', isPublished: true },
        { id: '2', title: 'Node.js Advanced', category: 'Backend', isPublished: true },
      ];

      Course.findAndCountAll.mockResolvedValue({
        count: 2,
        rows: mockCourses,
      });

      const response = await request(app)
        .get('/api/courses')
        .set(mockAuthHeader);

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(2);
      expect(response.body.pagination.total).toBe(2);
    });

    it('should filter courses by category', async () => {
      const mockCourses = [
        { id: '1', title: 'React Basics', category: 'Frontend', isPublished: true },
      ];

      Course.findAndCountAll.mockResolvedValue({
        count: 1,
        rows: mockCourses,
      });

      const response = await request(app)
        .get('/api/courses?category=Frontend')
        .set(mockAuthHeader);

      expect(response.status).toBe(200);
      expect(response.body.data[0].category).toBe('Frontend');
    });

    it('should search courses by title', async () => {
      const mockCourses = [
        { id: '1', title: 'React Basics', category: 'Frontend', isPublished: true },
      ];

      Course.findAndCountAll.mockResolvedValue({
        count: 1,
        rows: mockCourses,
      });

      const response = await request(app)
        .get('/api/courses?search=React')
        .set(mockAuthHeader);

      expect(response.status).toBe(200);
      expect(response.body.data[0].title).toContain('React');
    });

    it('should filter by level', async () => {
      const mockCourses = [
        { id: '1', title: 'Advanced React', level: 'Advanced', isPublished: true },
      ];

      Course.findAndCountAll.mockResolvedValue({
        count: 1,
        rows: mockCourses,
      });

      const response = await request(app)
        .get('/api/courses?level=Advanced')
        .set(mockAuthHeader);

      expect(response.status).toBe(200);
      expect(response.body.data[0].level).toBe('Advanced');
    });

    it('should handle empty results', async () => {
      Course.findAndCountAll.mockResolvedValue({
        count: 0,
        rows: [],
      });

      const response = await request(app)
        .get('/api/courses?search=nonexistent')
        .set(mockAuthHeader);

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(0);
    });
  });

  describe('POST /api/courses', () => {
    it('should create a new course with valid data', async () => {
      const courseData = {
        title: 'Advanced React',
        description: 'Learn advanced React concepts',
        category: 'Frontend',
        level: 'Advanced',
      };

      Course.create.mockResolvedValue({ id: '123', ...courseData });

      const response = await request(app)
        .post('/api/courses')
        .set(mockAuthHeader)
        .send(courseData);

      expect(response.status).toBe(201);
      expect(response.body.data.title).toBe(courseData.title);
      expect(response.body.data.description).toBe(courseData.description);
    });

    it('should reject course creation without title', async () => {
      const response = await request(app)
        .post('/api/courses')
        .set(mockAuthHeader)
        .send({ description: 'Missing title' });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('title');
    });

    it('should reject course creation without description', async () => {
      const response = await request(app)
        .post('/api/courses')
        .set(mockAuthHeader)
        .send({ title: 'No Description' });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('description');
    });

    it('should reject course creation without category', async () => {
      const response = await request(app)
        .post('/api/courses')
        .set(mockAuthHeader)
        .send({
          title: 'Test Course',
          description: 'Test description',
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('category');
    });

    it('should reject course creation without level', async () => {
      const response = await request(app)
        .post('/api/courses')
        .set(mockAuthHeader)
        .send({
          title: 'Test Course',
          description: 'Test description',
          category: 'Frontend',
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('level');
    });
  });

  describe('PUT /api/courses/:id', () => {
    it('should update an existing course', async () => {
      const courseId = '123';
      const updateData = {
        title: 'Updated Course Title',
        description: 'Updated description',
      };

      Course.update.mockResolvedValue([1]);
      Course.findByPk.mockResolvedValue({ id: courseId, ...updateData });

      const response = await request(app)
        .put(`/api/courses/${courseId}`)
        .set(mockAuthHeader)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.data.title).toBe(updateData.title);
    });

    it('should return 404 for non-existent course update', async () => {
      const courseId = 'nonexistent';
      const updateData = { title: 'Updated Title' };

      Course.update.mockResolvedValue([0]);
      Course.findByPk.mockResolvedValue(null);

      const response = await request(app)
        .put(`/api/courses/${courseId}`)
        .set(mockAuthHeader)
        .send(updateData);

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /api/courses/:id', () => {
    it('should delete an existing course', async () => {
      const courseId = '123';

      Course.destroy.mockResolvedValue(1);

      const response = await request(app)
        .delete(`/api/courses/${courseId}`)
        .set(mockAuthHeader);

      expect(response.status).toBe(200);
      expect(response.body.message).toContain('deleted');
    });

    it('should return 404 for non-existent course deletion', async () => {
      const courseId = 'nonexistent';

      Course.destroy.mockResolvedValue(0);

      const response = await request(app)
        .delete(`/api/courses/${courseId}`)
        .set(mockAuthHeader);

      expect(response.status).toBe(404);
    });
  });

  describe('POST /api/courses/:id/enroll', () => {
    it('should enroll user in course successfully', async () => {
      const courseId = '123';
      const userId = '456';

      Course.findByPk.mockResolvedValue({ id: courseId, title: 'Test Course' });

      const response = await request(app)
        .post(`/api/courses/${courseId}/enroll`)
        .set(mockAuthHeader);

      expect(response.status).toBe(200);
      expect(response.body.message).toContain('enrolled');
    });

    it('should return 404 for non-existent course enrollment', async () => {
      const courseId = 'nonexistent';

      Course.findByPk.mockResolvedValue(null);

      const response = await request(app)
        .post(`/api/courses/${courseId}/enroll`)
        .set(mockAuthHeader);

      expect(response.status).toBe(404);
    });
  });

  describe('GET /api/courses/:id', () => {
    it('should retrieve a single course', async () => {
      const courseId = '123';
      const mockCourse = {
        id: courseId,
        title: 'Test Course',
        description: 'Test description',
        category: 'Frontend',
        level: 'Beginner',
        isPublished: true,
      };

      Course.findByPk.mockResolvedValue(mockCourse);

      const response = await request(app)
        .get(`/api/courses/${courseId}`)
        .set(mockAuthHeader);

      expect(response.status).toBe(200);
      expect(response.body.data.title).toBe(mockCourse.title);
    });

    it('should return 404 for non-existent course', async () => {
      const courseId = 'nonexistent';

      Course.findByPk.mockResolvedValue(null);

      const response = await request(app)
        .get(`/api/courses/${courseId}`)
        .set(mockAuthHeader);

      expect(response.status).toBe(404);
    });
  });
});
