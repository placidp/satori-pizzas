import ContentLoader from 'react-content-loader'

export const Skeleton = () => (
  <ContentLoader
    className='pizza-block'
    speed={2}
    width={280}
    height={500}
    viewBox='0 0 280 500'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
    style={{ width: '100%' }}
  >
    <circle cx='135' cy='135' r='125' />
    <rect x='18' y='270' rx='10' ry='10' width='250' height='25' />
    <rect x='13' y='315' rx='10' ry='10' width='290' height='88' />
    <rect x='10' y='430' rx='10' ry='10' width='95' height='30' />
    <rect x='140' y='420' rx='15' ry='15' width='140' height='45' />
  </ContentLoader>
)
