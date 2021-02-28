import { NextPage } from 'next'
import MainLayout from '../layouts/MainLayout';

type PageWithMainLayoutType = NextPage & { layout: typeof MainLayout }
type PageWithLayoutType = PageWithMainLayoutType /* | PageWithSecondLayoutType */

export default PageWithLayoutType
