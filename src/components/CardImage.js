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
                <Button transparent>
                  <Icon active name="thumbs-up" />
                  {(props.numOfLikes > 0)? (<Text>{props.numOfLikes}</Text>):(<Text>like</Text>)}
                </Button>
              </Left>
              <Body>
                <Button
                  transparent
                  onPress={props.onpress}
                  >
                  <Icon active name="chatbubbles" />
                  <Text>Message</Text>
                </Button>
              </Body>
              <Right>
                <Text>{props.updatedAt}</Text>
              </Right>
            </CardItem>
          </Card>

  );
}

export{ CardImage };
