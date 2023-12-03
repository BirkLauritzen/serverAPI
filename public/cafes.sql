create table cafes
(
    id      serial
        primary key,
    name    varchar(100) not null,
    address varchar(255) not null,
    city    varchar(100) not null,
    star    integer
);

alter table cafes
    owner to "BirkLauritzen";

