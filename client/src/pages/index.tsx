import type { ReactElement } from 'react';
import CommonLayout from 'src/components/layouts/CommonLayout';
import type NextPageWithLayout from 'src/types/nextPageWithLayout';

const Home: NextPageWithLayout = () => <div>TOP</div>;

Home.getLayout = (page: ReactElement) => <CommonLayout>{page}</CommonLayout>;

export default Home;
