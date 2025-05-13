<!-- @format -->

<script setup lang="ts">
import Text from './Text.vue'
import Link from './Link.vue'
</script>

<template>
  <section class="contacts">
    <div class="contacts_wrapper">
      <div class="container">
        <div class="contacts_information">
          <div class="map">
          <div style="position: relative; overflow: hidden">
            <a
              href="https://yandex.by/maps/157/minsk/?utm_medium=mapframe&utm_source=maps"
              style="color: #eee; font-size: 12px; position: absolute; top: 0px"
              >Минск</a
            ><a
              href="https://yandex.by/maps/157/minsk/?ll=27.555691%2C53.902735&utm_medium=mapframe&utm_source=maps&z=12"
              style="
                color: #eee;
                font-size: 12px;
                position: absolute;
                top: 14px;
              "
              >Минск — Яндекс Карты</a
            ><iframe class="map"
              src="https://yandex.by/map-widget/v1/?ll=27.555691%2C53.902735&z=12"
              width="670"
              height="374"
              frameborder="1"
              allowfullscreen="true"
              style="position: relative"
            ></iframe>
          </div>
        </div>
          <div class="contacts_adress">
            <Text
              class="title_contacts"
              tag="h3"
              print="title_contacts"
              title="Бесплатно проконсультируем  по любому вопросу связанному с вашим любимцем"
            />
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
            <div class="time">
              <div>
                <Text tag="h3" print="title_time" title="Время работы" />
              </div>
              <div class="time_wrapper">
                <div class="timetable">
                  <img src="../assets/image/clock.svg" alt="" />
                  <Text tag="p" print="time" title="Пон.-Пят. 10:00-21:00" />
                </div>
                <div class="line"></div>
                <div class="timetable">
                  <Text tag="p" print="time" title="Суб.-Вос. 10:00-20:00" />
                </div>
              </div>
            </div>
              <div class="contacts__phone">
                <div>
                  <Text tag="h3" print="title_time" title="Телефон" />
                </div>
                <div class="phone_wrapper">
                  <img src="../assets/image/mobile_major.svg" alt="" />
                  <Link :is-link="false" class="link" link="tel:+375445010355">
                    + 375 (44) 501 03 55
                  </Link>
                </div>
              </div>
              <div class="social-network">
                <Text
                  tag="h3"
                  print="title_time"
                  title="Пишите нам в социальных сетях"
                />
                <Link
                  :is-link="false"
                  link="https://yandex.by/search"
                  kind="instagram"
                >
                  <img
                    class="instagram_image"
                    src="../assets/image/instagram-2-1 1.svg"
                    alt=""
                  />
                </Link>
              </div>
            
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>

.contacts_wrapper {
  background-color: var(--bg-default);
  padding: 56px 5px 56px 5px;
}

.contacts_information {
  display: flex;
  gap: 5px;
  justify-content: space-between;
  align-items: center;
}

.map {
  max-width: 670px;
  max-height: 374px;
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

.contacts_adress {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 344px;

  padding: 14px 70px 13px 0px;
}

.line {
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
}

.time {
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-wrap: nowrap;
}

.contacts__phone {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.phone_wrapper {
  display: flex;
  gap: 10px;
  align-items: center;
}

.social-network {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
