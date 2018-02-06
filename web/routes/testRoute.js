const testRoute = (req, res) => {
  return res.json({ message: 'Test Hello World Route!' });
}

module.exports = {
  testRoute
}