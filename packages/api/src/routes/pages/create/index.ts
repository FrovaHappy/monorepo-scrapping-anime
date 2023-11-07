import type { Response, Request } from 'express'
import type { ExtBodyUserVerified } from '../../../middleware/auth'
import type { JsonResponse } from '../../../../../types'
import type { CreatePagesBody } from '../validateSchema'
import scrapPagesDb from '../../../database/scrapPages.db'

export default async function create(
  req: Request<any, any, CreatePagesBody & ExtBodyUserVerified>,
  res: Response<JsonResponse>
) {
  const { userVerified, ...createPageBody } = req.body
  const pages = await scrapPagesDb.getOne({ namePage: createPageBody.namePage })
  if (pages) return res.status(401).json({ code: 401, message: 'pagina ya existe', ok: false, contents: null })
  const createdPage = await scrapPagesDb.create(createPageBody)

  return res.status(200).json({
    code: 200,
    message: 'pagina creada satisfactoriamente',
    ok: true,
    contents: { newToken: userVerified.newToken, page: createdPage }
  })
}
