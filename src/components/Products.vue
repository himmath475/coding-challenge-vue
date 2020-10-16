<template>
  <div class="container">
    <div class="row">
      <div
        v-for="product in products"
        :key="product.id"
        class="col-lg-4 col-md-6 col-sm-12 product-wrapper"
      >
        <img
          class="product-image"
          :src="product.hero.href"
          :alt="product.name"
          @click="openModal(product)"
        />
        <div v-html="product.name" class="product-name"></div>
        <div class="product-price">
          $
          {{
            (product.priceRange && product.priceRange.selling.high) ||
            product.price.selling
          }}
        </div>
      </div>
    </div>
    <div v-if="showModal">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog">
              <div class="modal-content">
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true" @click="showModal = false"
                    >&times;</span
                  >
                </button>
                <b-carousel
                  id="carousel-1"
                  controls
                  indicators
                  background="#ababab"
                  img-width="300"
                  img-height="300"
                  style="text-shadow: 1px 1px 2px #333"
                >
                  <!-- Slides with image only -->
                  <div v-for="(image, index) in images" :key="index">
                    <b-carousel-slide :img-src="image.href"></b-carousel-slide>
                  </div>
                </b-carousel>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { BCarouselSlide } from 'bootstrap-vue'

export default {
  name: "Products",
  data() {
    return {
      products: [],
      info: {},
      showModal: false,
      images: [],
    };
  },
  mounted() {
    axios
      .get(
        "https://www.westelm.com/services/catalog/v4/category/shop/new/all-new/index.json"
      )
      .then((res) => {
        this.info = res.data;
        this.products = this.info.groups;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    openModal: function (product) {
      this.images = [product.thumbnail].concat(product.images);
      this.showModal = true;
    },
  },
};
</script>

<style scoped>
.product-wrapper {
  position: relative;
  display: flex;
}
img {
  width: 250px;
  height: auto;
  object-fit: contain;
}
.product-name {
  position: absolute;
  width: 250px;
  text-align: left;
  background: #9e9e9e24;
  padding: 5px 10px;
  text-transform: UPPERCASE;
  font-size: 12px;
  font-weight: 600;
}

.product-price {
  position: absolute;
  bottom: 10%;
  background: #474141;
  color: white;
  font-weight: bold;
  padding: 5px 10px;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.close {
  position: absolute;
  float: right;
  width: 100%;
  text-align: right;
  z-index: 10;
  font-size: 40px;
}
</style>
