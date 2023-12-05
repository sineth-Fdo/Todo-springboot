package com.example.todomanagement.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SpringSecurityConfig {

    @Bean
    public static PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();


    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {


        http.csrf().disable()
                .authorizeHttpRequests((authaorize) -> {
                             authaorize.requestMatchers(HttpMethod.POST, "/api/**").hasRole("ADMIN")
                            .requestMatchers(HttpMethod.PUT, "/api/**").hasRole("ADMIN")
                            .requestMatchers(HttpMethod.DELETE, "/api/**").hasRole("ADMIN")
                            .requestMatchers(HttpMethod.GET, "/api/**").hasAnyRole("ADMIN", "USER")
                            .requestMatchers(HttpMethod.PATCH, "/api/**").hasAnyRole("ADMIN", "USER");

//                    authaorize.requestMatchers(HttpMethod.GET, "/api/**").permitAll();

                    authaorize.anyRequest().authenticated();

                }).httpBasic(Customizer.withDefaults());

        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails sineth = User.builder()
                .username("sineth")
                .password(passwordEncoder().encode("1234"))
                .roles("USER")
                .build();

        UserDetails admin = User.builder()
                .username("admin")
                .password(passwordEncoder().encode("admin"))
                .roles("ADMIN")
                .build();

        return new InMemoryUserDetailsManager(sineth, admin);

    }



}
