import { useParams } from 'react-router-dom';

export default function Page() {
  const { id } = useParams();

  return <div>notice id : {id}</div>;
}
