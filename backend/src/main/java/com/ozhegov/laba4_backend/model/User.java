package com.ozhegov.laba4_backend.model;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq")
    @SequenceGenerator(name = "user_seq", sequenceName = "id_users", allocationSize = 1)
    private long id;
    @Column
    private String name;
    @Column
    private String password;

    public User(String name, String password) {
        this.name = name;
        this.password = password;
    }
}
