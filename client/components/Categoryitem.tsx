 import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { CategoryItemProps } from '@/constants/types'
import { Ionicons } from '@expo/vector-icons'

export default function Categoryitem({ item, isSelected, onPress }: CategoryItemProps) {
  return (
    <TouchableOpacity className='mr-4 items-center' onPress={onPress}>

      <View
        className={`w-14 h-14 rounded-full items-center justify-center mb-2 ${
          isSelected ? 'bg-primary' : 'bg-surface'
        }`}
      >
        <Ionicons
          name={item.icon as any}
          size={24}
          color={isSelected ? "#000" : "#555"}   // ✅ fixed icon color
        />
      </View>

      <Text
        style={{
          fontWeight: isSelected ? 'bold' : 'normal',
          color: isSelected ? '#000' : '#888'
        }}
      >
        {item.name}
      </Text>

    </TouchableOpacity>
  )
}