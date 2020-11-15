module.exports = async () => {
  if (typeof IntersectionObserver === 'undefined') {
    await import('intersection-observer');
  }
}
