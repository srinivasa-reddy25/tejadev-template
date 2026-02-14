import type { Request, Response } from 'express'

import { slugify } from '@tejadev/shared'

type TBody = {
  text?: string
}

const postSlugController = (
  req: Request<unknown, unknown, TBody>,
  res: Response
) => {
  const text = req.body.text ?? ''
  const slug = slugify(text)
  res.json({ input: text, slug })
}

export { postSlugController }
