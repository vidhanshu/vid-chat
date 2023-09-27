import { FRONTEND_ROUTES } from '@/src/common/utils/routes'
import { redirect } from 'next/navigation'

const page = () => {
  return redirect(FRONTEND_ROUTES.chat)
}

export default page