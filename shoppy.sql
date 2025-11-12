-- 데이터 베이스 생성 
create database shoppy;

-- 데이터 베이스 선택
use shoppy;
select database();
desc product;

-- 항목명 변경
alter table product CHANGE imgList img_list JSON;

-- 오토 커밋 해제
SET autocommit = 0;

-- 테이블 목록 확인
show tables;

select * from users;
select * from orders;
SHOW VARIABLES LIKE 'char%';
desc member;
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
desc product;

select * from product;
-- shoppy 테이블 생성
/**
* 상품 테이블 : product
**/
select * from orders;
select * from cart;
select * from users;

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

select * from product;

-- 다중입력
insert into product(name, price, info, rate, image, imgList) 
values('티셔츠', 12000, '티셔츠', 3.2, '4.webp', '["4.webp","4.webp","4.webp"]'),
		('티셔츠', 20000, '티셔츠', 5, '5.webp', '["5.webp","5.webp","5.webp"]'),
        ('스트레치 비스트 드레스', 55000, '스트레치 비스트 드레스', 3, '6.webp', '["6.webp","6.webp","6.webp"]'),
        ('자켓', 115000, '자켓', 3.5, '7.webp', '["7.webp", "7.webp", "7.webp"]') ;

-- 상품 디테일 정보 테이블
create table product_detailinfo(
	did		int		auto_increment		primary key,
    title_en		varchar(100),
	title_ko		varchar(100),
	pid		int		not null,
    list	json,	-- backend 타입에 따라 다르다. nodeJS(JSON타입을 지원하므로 바로 사용), springboot(String, List<> 타입으로 진행)
	constraint fk_product_pid foreign key(pid)
    references product(pid)
    on delete cascade
    on update cascade
);

select * from product_detailinfo;
-- mysql에서 json, csv 등등 데이터 파일을 업로드 하는 경로
show variables like 'secure_file_priv';

-- product.json파일을 읽어서 detailinfo 정보 매핑
insert into product_detailinfo(title_en, title_ko, pid, list)
select 
	jt.title_en,
    jt.title_ko,
    jt.pid,
    jt.list -- json테이블의 컬럼을 매핑
from 
	json_table(
		-- 경로 확인 잘할것.
		cast(load_file('C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\products.json') -- load_file 파일 읽어오기. cast 변환
			AS CHAR CHARACTER SET utf8mb4), -- utf8형식일 경우 cast필요 해당 문자형식으로 매핑.
		'$[*]' COLUMNS(
			title_en	VARCHAR(100)	PATH	'$.detailInfo.title_en',
			title_ko	VARCHAR(100)	PATH	'$.detailInfo.title_ko',
			list		json	PATH	'$.detailInfo.list',
			pid			int		PATH	'$.pid'
        )
    ) as jt; -- 별칭(as) 필수

select * from product_detailinfo;

SELECT * FROM product_return;
-- 상품 Q&A 테이블
CREATE TABLE product_qna(
	qid				INT				AUTO_INCREMENT	PRIMARY KEY,
    title			VARCHAR(100)	NOT NULL,
    content 		VARCHAR(200),
    is_lock			boolean			DEFAULT false,
    is_complete		boolean			DEFAULT false,
    id				VARCHAR(20)		NOT NULL,
    pid				INT				NOT NULL,
    cdate			datetime,
    constraint fk_product_qna_pid foreign key(pid)	references product(pid)
		on delete cascade on update cascade,
    constraint fk_product_qna_id foreign key(id)	references member(id)
		on delete cascade on update cascade
);
select * from product_qna;

-- product.json파일을 읽어서 detailinfo 정보 매핑
insert into product_qna(title, content, is_lock, is_complete, id, pid, cdate)
select 
	jt.title,
    jt.content,
    jt.is_lock,
    jt.is_complete,
    jt.id,
    jt.pid,
    jt.cdate
from 
	json_table(
		-- 경로 확인 잘할것.
		cast(load_file('C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\productQnA.json') -- load_file 파일 읽어오기. cast 변환
			AS CHAR CHARACTER SET utf8mb4), -- utf8형식일 경우 cast필요 해당 문자형식으로 매핑.
		'$[*]' COLUMNS(
			title		VARCHAR(100)	PATH	'$.title',
			content		VARCHAR(200)	PATH	'$.content',
			is_lock		BOOLEAN			PATH	'$.isLock',
			is_complete	BOOLEAN			PATH	'$.isComplete',
			id			VARCHAR(20)		PATH	'$.id',
			pid			INT				PATH	'$.pid',
			cdate		DATETIME		PATH	'$.cdate'
        )
    ) as jt; -- 별칭(as) 필수


select * from product;


SELECT pd.did, pd.title_en, pd.title_ko, pd.pid, pd.list 
FROM product_detailinfo pd, product p 
WHERE pd.pid = 1 
AND pd.pid = p.pid;

SELECT pd.did as did, pd.title_en as titleEn, pd.title_ko as titleKo, pd.pid as pid, pd.list as list
FROM product_detailinfo pd, product p
WHERE pd.pid = 1
AND pd.pid = p.pid;

select * from member;


select * from product_qna;
-- test 회원이 분홍색 후드티 pid 1 상품에 슨 QnA 조회
-- 회원아이디 , 회원명, 가입날짜, 상품명, 상품가격, QnA제목, 내용, QnA 등록일

SELECT m.id, m.name, m.mdate, p.name, p.price, qna.title, qna.content, qna.cdate
FROM product_qna qna, product p, member m
WHERE m.id = qna.id
AND p.pid = qna.pid
AND m.id = "test"
AND p.pid = 1;



SELECT qna.qid, qna.title, qna.content, qna.is_lock, qna.is_complete, qna.id, qna.pid, qna.cdate
FROM product_qna qna, product p
WHERE qna.pid = 1
AND qna.pid = p.pid;



-- 상품 배달/반송 테이블 
CREATE TABLE product_return(
	rid			int				auto_increment	primary key,
    title		varchar(100)	not null,
    description	varchar(200),
    list		json
);

select * from product_return;

-- product_return.json파일을 읽어서 배송/반품 정보 매핑
insert into product_return(title, description, list)
select 
	jt.title,
    jt.description,
    jt.list
from 
	json_table(
		-- 경로 확인 잘할것.
		cast(load_file('C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\productReturn.json') -- load_file 파일 읽어오기. cast 변환
			AS CHAR CHARACTER SET utf8mb4), -- utf8형식일 경우 cast필요 해당 문자형식으로 매핑.
		-- [로 시작하지 않고, json 데이터가 하나일 경우 '$' 그 외 '$[*]'
        '$' COLUMNS(
			title		VARCHAR(100)	PATH	'$.title',
			description	VARCHAR(200)	PATH	'$.description',
			list		JSON			PATH	'$.list'
        )
    ) as jt; -- 별칭(as) 필수

-- 장바구니 테이블    
create table cart(
	cid 	int 		auto_increment	primary key,
    size	char(2)		not null,
    qty		int			default 0	not null,
    pid		int			not null,
    id		varchar(20)	not null,
    cdate	datetime,
    constraint fk_cart_pid foreign key(pid) references product(pid)
		on delete cascade        on update cascade,
	constraint fk_cart_id foreign key(id) references member(id)
		on delete cascade        on update cascade
);

select * from cart;

-- 장바구니 상품 갯수 조회
select ifnull(sum(qty),0) as qty from cart
WHERE id = "test";

-- 장바구니 조회
SELECT m.id,  p.pid, c.cid, p.name, p.price, p.image, c.size, c.qty
FROM member m, product p, cart c
WHERE m.id = c.id
AND p.pid = c.pid
AND m.id = "test";

select sum(c.qty*p.price) as total from cart c
inner join product p
on c.pid = p.pid
where c.id = "test";

-- cartlist view
create view view_cart_list
as
SELECT m.id, p.info, p.pid, c.cid, p.name, p.price, p.image, c.size, c.qty
FROM member m, product p, cart c
WHERE m.id = c.id
AND p.pid = c.pid
;

select * from view_cart_list;

-- view 삭제
drop view view_cart_list;

/*********************************************************************
	주문 테이블 : orders
**********************************************************************/
use shoppy;
select database();
select * from member;
desc member;
drop table orders;
create table orders (
  oid         		int 			auto_increment	primary key,
  order_code		varchar(40)		not null	unique,		-- 카카오 partner_order_id로 사용
  member_id	      		varchar(50)    	not null,				-- 회원 아이디
  status        	enum('대기중','결제중','결제완료','취소','환불','만료')
					not null default	'대기중',
  shipping_fee     	int				not null 	default 0,	-- 배송비
  discount_amount  	int				not null 	default 0,	-- 할인금액
  total_amount     	int				not null,  				-- 결제요청 금액(= 카카오 amount.total)

  -- 수취/배송 스냅샷
  receiver_name    	varchar(50),
  receiver_phone   	varchar(50),
  zipcode          	varchar(20),
  address1         	varchar(255),
  address2         	varchar(255),
  memo             	varchar(255),
  odate				datetime,
  
  constraint fk_orders_member foreign key(member_id)	references member(id)
		on delete cascade	on update cascade
);

show tables;
desc orders;
select * from product;

/*********************************************************************
	주문 상세 테이블 : order_detail
**********************************************************************/
create table order_detail (
	odid			int				auto_increment		primary key,
	order_code		varchar(40)		not null,	
    pid				int				not null,
    pname			varchar(50),
    size			char(2),
    qty				int,
    pid_total_price	decimal,		-- 상품 토탈가격
    discount		decimal,		-- 할인 금액
	
    constraint fk_order_order_detail foreign key(order_code)	references orders(order_code)
		on delete cascade   on update cascade,
	constraint fk_product_order_detail foreign key(pid)	references product(pid)
		on delete cascade  on update cascade
);

select * from cart;

show tables;
desc order_detail;
use candy;

select * from product;