import type { Request, Response } from 'express'

import { slugify } from '@tejadev/shared'

type TBody = {
  text?: string
}

const post_slug_controller = (
  req: Request<unknown, unknown, TBody>,
  res: Response
) => {
  const text = req.body.text ?? ''
  const slug = slugify(text)
  res.json({ input: text, slug })
}

export { post_slug_controller }
