create table favorites
(
    id      serial
        primary key,
    user_id integer
        references users
            on delete cascade,
    cafe_id integer
        references cafes
            on delete cascade
);

alter table favorites
    owner to "BirkLauritzen";

