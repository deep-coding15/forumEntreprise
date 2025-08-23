import { GetStaticProps } from "next";
import Link from "next/link";

import { User } from "../../interfaces";
import { sampleUserData } from "../../utils/sample-data";
import Layout from "../../components/Layout";
import List from "../../components/List";







type Props = {
  items: User[];
};

const WithStaticProps = ({ items }: Props) => (
  <Layout title="Users List | Next.js + TypeScript Example">
    
    
    {/* Début de la section bienvenue responsive */}
    <div className="hero">
      <h1>Bienvenue sur la liste des utilisateurs</h1>

      <style jsx>{`
        .hero {
          padding: 40px;
          text-align: center;
        }

        @media (max-width: 768px) {
          .hero {
            padding: 20px;
          }

          h1 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
    {/* Fin de la section bienvenue */}
    
    
    <h1>Users List</h1>
    <p>
      Example fetching data from inside <code>getStaticProps()</code>.
    </p>
    <p>You are currently on: /users</p>
    <List items={items} />
    <p>
      <Link href="/">Go home</Link>
    </p>
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const items: User[] = sampleUserData;
  return { props: { items } };
};

export default WithStaticProps;
