-- 데이터 베이스 생성 
create database shoppy;

-- 데이터 베이스 선택
use shoppy;
select database();

-- 테이블 목록 확인
show tables;

-- 테이블 생성
create table member(
	id varchar(20) primary key,
    pwd varchar(12) not null,
    name varchar(20) not null,
    phone char(13),
    email varchar(50) not null,
    mdate date
);

-- 테이블 구조 확인
desc member;

select * from member;

-- shoppy 테이블 생성
/**
* 상품 테이블 : product
**/

create table product(
	pid		int				auto_increment		primary key,
	name	varchar(200)	not null,
    price 	int				default 0,
    info	varchar(200),
    rate	decimal(2,1)	default 0.0,
    image	varchar(100),
    imgList json /**json타입으로 데이터 저장*/
);

desc product;

-- 다중입력
insert into product(name, price, info, rate, image, imgList) 
values('티셔츠', 12000, '티셔츠', 3.2, '4.webp', '["4.webp","4.webp","4.webp"]'),
		('티셔츠', 20000, '티셔츠', 5, '5.webp', '["5.webp","5.webp","5.webp"]'),
        ('스트레치 비스트 드레스', 55000, '스트레치 비스트 드레스', 3, '6.webp', '["6.webp","6.webp","6.webp"]'),
        ('자켓', 115000, '자켓', 3.5, '7.webp', '["7.webp", "7.webp", "7.webp"]') ;

select * from product2;

-- 오토 커밋 해제
SET autocommit = 0;

