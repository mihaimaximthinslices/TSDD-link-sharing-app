import app from '../server/app'
import 'dotenv/config'

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

export default app
