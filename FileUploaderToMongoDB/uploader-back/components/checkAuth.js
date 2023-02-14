import jwt from 'jsonwebtoken'

export default (req, res, next) => {
  const token = (req.body.token || '').replace(/Bearer\s?/, '')
  if (token) {
    try {
      const decod = jwt.verify(token, 'mrdrew321')
      req.Id = decod._id
      next()
    } catch (e) {
      res.status(404).json({
        message: 'Heve no access',
      })
    }
  } else {
    return res.status(404).json({
      message: 'Have no access',
    })
  }
}
