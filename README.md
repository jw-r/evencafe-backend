# evencafe-backend

## 따로 구현한 것

- createCoffeeShop, editCoffeeShop, uploadPhoto, deletePhoto, editProfile
  Upload Photo / Delete Photo
  AWS 연동으로 삭제 시 AWS에서도 삭제 되도록 했음

- Search Shop

- followCoffeeShop, unfollowCoffeeShop

- file path
  유저 Avatar /avatars
  카페
  Avatar shops/{name}/avatar
  Photo shops/{name}/photo

- Category
  카테고리 수정 시, 이미 연결되어 있던 모든 카테고리와 연결을 끊고, 새로운 카테고리와 연결
  업데이트 후, 카테고리에 해당하는 카페가 존재하지 않다면 해당 카테고리 삭제

## User Resolver

- createAccount (email! name! username! password!)
  email, username unique 체크 (모듈화)
  password hashing (모듈화)
  create new user
- login (username! password!)
  존재하는 유저명인지 확인 (모듈화)
  입력받은 패스워드 hashing 후, DB에 저장된 정보와 비교 (bcrypt compare 함수)
  token 발급 (jsonwebtoken)
- seeProfile (id || username)
  해당 id 의 유저가 존재하면 반환 else if 해당 username 을 가진 유저가 존재하면 반환
- editProfile (email name username password location avatarURL githubUsername) protected
  edit 권한이 있는지 체크
  email, username unique 체크 (모듈화)
  password hashing (모듈화)
  if 기존에 avatarURL이 존재한다면 AWS S3 에서 해당 avatar 삭제 (모듈화)
  AWS S3 아바타 업로드 (path: /avatars/{username}-{Date.now()-filename}) 후, URL 반환 (모듈화)
  update User
- followUser (username!) protected
  해당 username 을 가진 유저 찾기
  update User (following 과 connect)
- unfollowUser (username!) protected
  해당 username 을 가진 유저 찾기
  update User (following 과 disconnect)
- searchUser (keyword!)
  username 이 keyword 로 시작하는 User[] 찾은 후, 반환
- followCoffeeShop (name!) protected
  해당 name 의 coffeeShop 찾기
  update User (followingShops 과 connect)
- unfollowCoffeeShop
  해당 name 의 coffeeShop 찾기
  update User (followingShops 과 disconnect)

## CoffeeShop Resolver

- createCoffeeShop (name! latitude longitude avatar categories) protected
  name unique 체크
  if avatar 가 존재한다면 AWS S3에서 해당 아바타 삭제,
  avatar 를 AWS S3에 업로드 후, Url 반환 (모듈화) (path: "shops/{name}/avatar")
  정규식으로 카테고리 분류
  create new Coffee Shop
  User 와 connect, 카테고리가 이미 DB에 존재한다면 카테고리와 connect, 존재하지 않는다면 카테고리 생성 후, connect
- editCoffeeShop (id! name latitude longitude avatar categories) protected
  해당 id의 Coffee Shop이 존재하는지 체크
  edit 권한이 있는지 체크
  if (name) name 의 unique 가 보장되는지 체크
  if (avatar) DB에 avatarURL 이 존재한다면 AWS S3 에서 해당 아바타 삭제 후,
  AWS S3 에 아바타 업로드 후 반환
  if (category) 정규식으로 카테고리 분류 후, 해당 카테고리가 DB에 존재한다면 connect,
  존재 하지 않는다면 create category 후 connect
  category name 과 연결된 카페의 length 가 0 이라면 해당 name의 category delete
  update shop
- uploadPhoto (id!, file!) protected
  해당 id 의 Coffee Shop 이 존재하는지 확인
  Coffee Shop 을 수정할 수 있는지 권한 체크
  AWS S3에 file 업로드 후 Url 반환 (path: shops/{caffee name}/photo)
  create Photo (Coffee Shop 모델과 connect)
- deletePhoto (id!) protected
  해당 id의 Coffee Shop이 존재하는지 확인
  user 에게 사진을 삭제할 권한이 있는지 확인
  AWS S3에서 해당 id 의 사진 삭제
  CoffeeShopPhoto 모델의 데이터 delete
- seeCoffeeShop (id!)
  해당 id의 Coffee Shop을 find 후, 반환 (include photos, categories, user)
- seeCoffeeShops (page!)
  DB의 모든 Coffee Shops 을 반환 (cursor pagination 을 이용해 10개씩 반환, totalShops, totalPages 반환)
- seeCategories (page!)
  DB의 모든 카테고리 반환 (cursor pagination 을 이용해 15개씩 반환, totalCategories, totalPages 반환)
- seeCategory (name! page!)
  해당 name 의 카테고리를 가진 Coffee Shops 을 모두 반환 (cursor pagination 을 이용해 15개 씩 반환, totalShops, totalPages 반환)

## 수정 예정

- 유저가 카페를 팔로워 할 수 있도록. ✅
- 유저 프로필에 팔로우한 카페가 보이도록 (cursor based pagination)
- 카페 모델에 adress 추가 ✅

"graphql-upload": "^11.0.0"
