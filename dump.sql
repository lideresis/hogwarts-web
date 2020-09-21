-- Adminer 4.7.4 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP DATABASE IF EXISTS `hogwarts`;
CREATE DATABASE `hogwarts` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `hogwarts`;

DROP TABLE IF EXISTS `alunos`;
CREATE TABLE `alunos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `idade` int(11) NOT NULL,
  `especialidade` varchar(255) NOT NULL,
  `ativo` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `alunos` (`id`, `nome`, `idade`, `especialidade`, `ativo`) VALUES
(1,	'Harry Potter',	150,	'Voar',	1),
(14,	'Hermione Jean Granger',	130,	'Correr',	1);

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(80) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `usuarios` (`id`, `nome`, `email`, `senha`) VALUES
(2,	'Dumbledore',	'dumbledore@hogwarts.school',	'$2a$10$4NO8xKePlLPhIzxYxJdjVe.eXlW7i8nTvKHq.3x8YKSyxtZtRM49a');

-- 2020-09-21 03:22:10
