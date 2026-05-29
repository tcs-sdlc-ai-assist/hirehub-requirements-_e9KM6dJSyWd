const STORAGE_KEY = 'hirehub_submissions';

/**
 * Retrieves all submissions from localStorage
 * @returns {Array<Submission>} submissions array (empty if none or error)
 */
export function getSubmissions() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.warn('Corrupted localStorage data, resetting submissions');
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    return [];
  }
}

/**
 * Saves submissions array to localStorage
 * @param {Array<Submission>} submissions - array to save
 */
export function saveSubmissions(submissions) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
  } catch (e) {
    console.error('Failed to save submissions to localStorage');
    throw e;
  }
}

/**
 * Adds a new submission
 * @param {Submission} submission - submission object to add
 * @returns {boolean} true if successful
 */
export function addSubmission(submission) {
  const submissions = getSubmissions();
  submissions.push(submission);
  saveSubmissions(submissions);
  return true;
}

/**
 * Updates a submission by ID
 * @param {string} id - submission ID
 * @param {Partial<Submission>} updates - fields to update
 * @returns {boolean} true if found and updated, false otherwise
 */
export function updateSubmission(id, updates) {
  const submissions = getSubmissions();
  const index = submissions.findIndex(s => s.id === id);
  if (index === -1) return false;
  submissions[index] = { ...submissions[index], ...updates };
  saveSubmissions(submissions);
  return true;
}

/**
 * Deletes a submission by ID
 * @param {string} id - submission ID
 * @returns {boolean} true if found and deleted, false otherwise
 */
export function deleteSubmission(id) {
  const submissions = getSubmissions();
  const initialLength = submissions.length;
  const filtered = submissions.filter(s => s.id !== id);
  if (filtered.length === initialLength) return false;
  saveSubmissions(filtered);
  return true;
}

/**
 * Checks if email already exists in submissions
 * @param {string} email - email to check
 * @returns {boolean} true if duplicate exists
 */
export function isEmailDuplicate(email) {
  return getSubmissions().some(sub => sub.email.toLowerCase() === email.toLowerCase());
}