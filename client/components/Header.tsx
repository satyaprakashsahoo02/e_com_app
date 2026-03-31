 import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { HeaderProps } from '@/constants/types'
import { COLORS } from '@/constants'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

export default function Header({
  title,
  showBack,
  showSearch,
  showCart,
  showMenu,
  showLogo
}: HeaderProps) {
  const router = useRouter()
  const { itemCount } = { itemCount: 6 } // example count

  return (
    <View className="flex-row items-center justify-between px-4 py-3 bg-white">
      {/* Left side */}
      <View className="flex-row items-center flex-1">
        {showBack && (
          <TouchableOpacity
            onPress={() => router.back()}
            className="mr-3"
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        )}

        {showMenu && (
          <TouchableOpacity className="mr-3">
            <Ionicons name="menu-outline" size={28} color={COLORS.primary} />
          </TouchableOpacity>
        )}

        {showLogo ? (
          <View className="flex-1">
            <Image
              source={require('@/assets/logo.png')}
              style={{ width: '100%', height: 24 }}
              resizeMode="contain"
            />
          </View>
        ) : (
          title && (
            <Text className="text-xl font-bold text-primary text-center flex-1 mr-8">
              {title}
            </Text>
          )
        )}

        {!title && !showSearch && <View className="flex-1" />}
      </View>

      {/* Right side */}
      <View className="flex-row items-center gap-4">
        {showSearch && (
          <TouchableOpacity>
            <Ionicons name="search-outline" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        )}

        {showCart && (
          <TouchableOpacity 
            className="relative" 
            onPress={() => router.push('/(tabs)/cart')}
          >
            <Ionicons name="bag-outline" size={24} color={COLORS.primary} />
            {/* Badge for item count */}
            <View className="absolute -top-2 -right-2 bg-red-500 rounded-full w-4 h-4 items-center justify-center">
              <Text className="text-white text-xs">{itemCount}</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}