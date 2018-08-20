import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

const CardImage = ( props ) => {
    return (
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={props.source} />
                <Body>
                  <Text>{props.nickname}</Text>
                  <Text note>{props.sex},{props.number}명,{props.age}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={props.source} style={{height: 300, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Text>{props.selfIntro}</Text>
            </CardItem>
            <CardItem>
              <Left>
                <Button
                  transparent
                  onPress={props.onPress}
                  >
                  <Icon active name="thumbs-up" />
                  <Text>Likes</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent>
                  <Icon active name="chatbubbles" />
                  <Text>Message</Text>
                </Button>
              </Body>
              <Right>
                <Text>1h ago</Text>
              </Right>
            </CardItem>
          </Card>

  );
}

export{ CardImage };
