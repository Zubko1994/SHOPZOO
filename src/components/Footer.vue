<!-- @format -->

<script setup lang="ts">
import Link from './Link.vue'
import Navigation from './Navigation.vue'
import LogoFooter from './LogoFooter.vue'
import Text from './Text.vue'
import Button from './Button.vue'
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__wrapper">
        <div class="footer__ceil">
          <Link link="#">
            <LogoFooter />
          </Link>
          <Navigation color="black" />
        </div>
        <div class="line"></div>
        <div class="contacts_info">
          <div class="info">
            <div class="info__adress">
              <img src="../assets/image/Primary.svg" alt="карта" />
              <Text tag="p" print="adress" title="Минск, ул. Чюрлёниса, 6." />
            </div>
            <div class="info__metro">
              <img src="../assets/image/metro.svg" alt="метро" />
              <Text tag="p" print="adress" title="Малиновка" />
            </div>
          </div>
          <div class="phone_wrapper">
            <img src="../assets/image/mobile_major.svg" alt="" />
            <Link :is-link="false" class="link" link="tel:+375445010355">
              + 375 (44) 501 03 55
            </Link>
          </div>
          <div class="time_wrapper">
            <div class="timetable">
              <img src="../assets/image/clock.svg" alt="" />
              <Text tag="p" print="time" title="Пон.-Пят. 10:00-21:00" />
            </div>
            <div class="line_vertical"></div>
            <div class="timetable">
              <Text tag="p" print="time" title="Суб.-Вос. 10:00-20:00" />
            </div>
          </div>
          <Button class="backcall_footer" kind="backcall"
            >Обратный звонок</Button
          >
        </div>
        <div class="copyright">
          <div class="creator">
            <Text tag="p" print="copyright" title="Дизайн сайта:" />
            <Link :is-link="false" class="email" link="email:+375445010355">
              shkuratovdesigner.com
            </Link>
          </div>
          <Text tag="p" print="copyright" title="© Все права защищены 2022" />
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer__wrapper {
  padding: 16px 5px 18px 5px;
}

.footer__ceil {
  display: flex;
  justify-content: space-between;
  margin-bottom: 18px;
}

.line {
  border-top: var(--border-disabled);
  margin-bottom: 17px;
}

.info {
  display: flex;
  gap: 12px;
  align-items: center;
}

.info__adress {
  display: flex;
  gap: 10px;
  align-items: center;
  text-wrap: nowrap;
}

.info__metro {
  display: flex;
  gap: 6px;
  align-items: center;
}

.phone_wrapper {
  display: flex;
  gap: 10px;
  align-items: center;
}

.line_vertical {
  width: 5px;
  height: 17px;
  background-color: rgb(140, 145, 150);
}

.timetable {
  display: flex;
  gap: 6px;
}

.time_wrapper {
  display: flex;
  gap: 6px;
  text-wrap: nowrap;
}

.time {
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-wrap: nowrap;
}

.contacts_info {
  display: flex;
  gap: 5px;
  justify-content: space-between;
}

.backcall_footer {
  background: none;
  &:hover {
    color: var(--highlight-hover);
    background: none;
  }
}

.email {
  color: var(--blue-text);
font-family: "SFProText";
font-size: 14px;
font-weight: 400;
line-height: 24px;
letter-spacing: 0px;
text-align: left;
}

.creator {
  display: flex;
  gap: 6px;
  align-items: center;
}

.contacts_info {
  margin-bottom: 17px;
}

.copyright {
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
}

@media (max-width: 992px) {

.container {
    max-width: 992px;
}

.footer__wrapper {
  padding: 16px 10px 16px 10px;
}

.footer__ceil {
  flex-wrap: wrap;
  gap: 16px 50px;
  justify-content: center;
}

.contacts_info {
  gap: 16px;
  flex-wrap: wrap;
  border-bottom: 1px solid rgb(210, 213, 216);
  padding-bottom: 16px;
  flex-direction: column;
  justify-content: center;
}

.info {
  justify-content: center;
}

.line_vertical {
  display: none;
}

.copyright {
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: column;
}

.phone_wrapper {
  justify-content: center;
}

.time_wrapper {
  justify-content: center;
}
}
</style>
