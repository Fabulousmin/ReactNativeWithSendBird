import faker from 'faker';

export const randomUser = (count = 10) => {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push({
      key: faker.random.uuid(),
      name: faker.name.firstName(),
      avatar: faker.image.avatar(),
      profileImg: faker.image.imageUrl(),
      sex: '남',
      age: faker.random.number(50),
      city: faker.address.city(),
      number: faker.random.number(10),
    });
  }
  return arr;
}
