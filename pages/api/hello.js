// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const doIt = (req, res) => {
  res.statusCode = 200;
  res.json({ name: 'John Doe' });
};

export default doIt;
