export function validateName(name) {
  if (!name || name.trim() === '') return 'Name is required';
  if (!/^[A-Za-z\s]+$/.test(name.trim())) return 'Name must contain only letters and spaces';
  if (name.length > 100) return 'Name must be 100 characters or less';
  return '';
}

export function validateEmail(email) {
  if (!email || email.trim() === '') return 'Email is required';
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) return 'Please enter a valid email address';
  return '';
}

export function validateMobile(mobile) {
  if (!mobile || mobile.trim() === '') return 'Mobile number is required';
  if (!/^\d{10}$/.test(mobile.trim())) return 'Mobile number must be exactly 10 digits';
  return '';
}

export function validateDepartment(dept) {
  const validDeps = ['Engineering', 'Design', 'Marketing', 'Human Resources', 'Finance', 'Operations', 'Sales', 'Data Science'];
  if (!dept || dept.trim() === '') return 'Please select a department';
  if (!validDeps.includes(dept.trim())) return 'Invalid department selected';
  return '';
}