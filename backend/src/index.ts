import { Hono } from 'hono'
import { userRoute } from './routes/user'
import { propertyRoute } from './routes/property'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/user',userRoute)
app.route('/property',propertyRoute)

export default app
