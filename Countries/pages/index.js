import Countries from '../components/Countries'
export default function Home({ data }) {
  return (
    <div>
      <Countries data={data} />
    </div>
  )
}
export async function getServerSideProps() {
  const res = await fetch('https://restcountries.com/v3.1/all')
  const data = await res.json()
  return {
    props: { data },
  }
}
