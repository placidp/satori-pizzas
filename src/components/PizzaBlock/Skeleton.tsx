import React from 'react'
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
  >
    <circle cx='130' cy='135' r='125' />
    <rect x='0' y='275' rx='10' ry='10' width='280' height='25' />
    <rect x='0' y='320' rx='10' ry='10' width='280' height='88' />
    <rect x='0' y='430' rx='10' ry='10' width='95' height='30' />
    <rect x='125' y='420' rx='45' ry='45' width='152' height='45' />
  </ContentLoader>
)
