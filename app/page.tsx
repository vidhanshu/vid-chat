import { redirect } from 'next/navigation'

import { FRONTEND_ROUTES } from '@/src/common/utils/routes'

const page = () => {
  return redirect(FRONTEND_ROUTES.chat)
}

export default page