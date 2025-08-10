import Layout from '@/components/Layout';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Layout>
      <section className="container py-24 text-center">
        <h1 className="mb-2">העמוד לא נמצא</h1>
        <p className="text-gray-600 mb-6">נראה שהכתובת שהוזנה אינה קיימת.</p>
        <Link className="btn btn-primary" href="/">חזרה לבית</Link>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  return { props: {} };
}


