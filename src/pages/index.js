import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Créez un composant séparé pour le modèle 3D
const Scene = dynamic(() => import('@/component/Scene'), {
  ssr: false,
  loading: () => <div>Chargement...</div>
})

export default function Home() {
  return (
    <div className="flex w-screen h-screen bg-cover bg-bg_image">
        <Suspense fallback={<div>Chargement...</div>}>
          <Scene />
        </Suspense>
    </div>
  )
}
