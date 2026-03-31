 import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import { BANNERS, dummyProducts } from '@/assets/assets'
import { useRouter } from 'expo-router'
import { CATEGORIES } from '@/constants'
import CategoryItem from '@/components/Categoryitem'
import { Product } from '@/constants/types'
import ProductCard from '@/components/ProductCard'

const { width } = Dimensions.get('window')

export default function Home() {
  const router = useRouter()

  const [activeBannerIndex, setActiveBannerIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const categories = [
    { id: 'all', name: 'ALL', icon: "grid" },
    ...CATEGORIES
  ]

  const fetchproducts = async () => {
    setProducts(dummyProducts)
    setLoading(false)
  }

  useEffect(() => {
    fetchproducts()
  }, [])

  const handleScroll = (e) => {
    const offsetX = e.nativeEvent.contentOffset.x
    const index = Math.round(offsetX / width)
    setActiveBannerIndex(index)
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <Header title="Forever's" showMenu showCart showLogo />

      <ScrollView showsVerticalScrollIndicator={false}>
        
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
        >
          {BANNERS.map((banner, index) => (
            <View key={index} style={{ width, height: 192 }}>
              
              <Image
                source={{ uri: banner.image }}
                style={{ width: '100%', height: '100%', borderRadius: 16 }}
                resizeMode="cover"
              />

              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0,0,0,0.4)',
                  borderRadius: 16
                }}
              />

              <View style={{ position: 'absolute', bottom: 16, left: 16 }}>
                <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>
                  {banner.title}
                </Text>

                <Text style={{ color: 'white', fontSize: 14 }}>
                  {banner.subtitle}
                </Text>

                <TouchableOpacity
                  onPress={() => router.push('/shop')}
                  style={{
                    marginTop: 8,
                    backgroundColor: 'white',
                    paddingHorizontal: 14,
                    paddingVertical: 6,
                    borderRadius: 20
                  }}
                >
                  <Text style={{ fontWeight: 'bold', fontSize: 12 }}>
                    Get Now
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
          {BANNERS.map((_, index) => (
            <View
              key={index}
              style={{
                height: 6,
                borderRadius: 10,
                marginHorizontal: 4,
                width: index === activeBannerIndex ? 20 : 6,
                backgroundColor: index === activeBannerIndex ? '#000' : '#ccc'
              }}
            />
          ))}
        </View>

        {/* Categories */}
        <View className="mb-6 px-4">
          <Text className="text-xl font-bold text-primary mb-4">
            Categories
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((cat) => (
              <CategoryItem
                key={cat.id}
                item={cat}
                isSelected={selectedCategory === cat.id}
                onPress={() => {
                  setSelectedCategory(cat.id)

                  router.push({
                    pathname: '/shop',
                    params: {
                      category: cat.id === 'all' ? '' : cat.name
                    }
                  })
                }}
              />
            ))}
          </ScrollView>
        </View>

        {/* Popular */}
        <View className="mb-8 px-4">
          
          <View className="flex-row justify-between items-center">
            <Text className='text-xl font-bold text-primary'> Popular</Text>

            <TouchableOpacity onPress={() => router.push('/shop')}>
              <Text className='text-secondary text-sm'>See All</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <View className="mt-4 items-center">
              <ActivityIndicator size='large'/>
            </View>
          ) : (
            <View className='flex-row flex-wrap justify-between mt-4'>
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </View>
          )}

        </View>
        

        {/* Newsletter CTA */}
        <View className='bg-gray-100 p-6 rounded-2xl mb-20 items-center mx-4'>
          <Text className='text-2xl font-bold text-primary mb-2 text-center'>
            Join the Revolution
          </Text>

          <Text className='text-secondary text-center mb-4'>
            Subscribe to our newsletter and get 10% off your first order!
          </Text>
          {/* ✅ BLACK CYLINDER BUTTON */}
          <TouchableOpacity className='bg-black w-full py-3 rounded-full items-center'>
            <Text className='text-white font-medium text-base'>
              Subscribe Now
            </Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
    </SafeAreaView>
  )
}