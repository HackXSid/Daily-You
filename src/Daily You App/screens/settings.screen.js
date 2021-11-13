import React from 'react';
import { Text, View } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';

export const Settings = ({ logout }) => {
  const list = [
    {
      title: 'Personal Profile',
      icon: 'person',
      type: 'ionicons',
    },
    {
      title: 'Data Usage',
      icon: 'data-usage',
      type: 'material',
    },
    {
      title: 'Privacy Policy',
      icon: 'privacy-tip',
      type: 'material',
    },
    {
      title: 'Terms and Conditions',
      icon: 'text-document',
      type: 'entypo',
    },
    {
      title: 'Contact Helpline',
      icon: 'support-agent',
      type: 'material',
    },
    {
      title: 'Contact Developer',
      icon: 'developer-mode',
      type: 'material',
    },
    {
      title: 'Log Out',
      icon: 'logout',
      type: 'material',
      special: true,
      fn: logout,
    },
  ];
  return (
    <>
      <View>
        {list.map((item, i) => (
          <ListItem
            key={i}
            bottomDivider
            onPress={() => {
              if (item.special) {
                item.fn();
              }
            }}>
            <Icon name={item.icon} type={item.type} />
            <ListItem.Content>
              <ListItem.Title>{item.title}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))}
      </View>
    </>
  );
};
