# evencafe-backend

## 따로 구현한 것

- createCoffeeShop, editCoffeeShop, uploadPhoto, deletePhoto, editProfile
  Upload Photo / Delete Photo
  AWS 연동으로 삭제 시 AWS에서도 삭제 되도록 했음

유저 Avatar /avatars

카페
Avatar shops/{name}/avatar
Photo shops/{name}/photo

- Category
  카테고리 수정 시, 이미 연결되어 있던 모든 카테고리와 연결을 끊고, 새로운 카테고리와 연결
  업데이트 후, 카테고리에 해당하는 카페가 존재하지 않다면 해당 카테고리 삭제
