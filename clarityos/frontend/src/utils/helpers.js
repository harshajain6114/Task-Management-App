export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const getInitials = (name) => {
  if (!name) return '';
  const names = name.split(' ');
  return names
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

export const isOverdue = (dueDate, status) => {
  if (!dueDate || status === 'completed') {
    return false;
  }
  return new Date(dueDate) < new Date();
};