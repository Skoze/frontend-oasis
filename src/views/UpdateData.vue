<template>
  <main class="update-container">
    <div class="card">
      <h1 class="card-title">从 IEEE 获取数据</h1>
      <v-spacer></v-spacer>
      <OASpider :loading="loading" @get="getData"></OASpider>
      <v-spacer></v-spacer>
    </div>
    <div class="card">
      <h1 class="card-title">上传数据</h1>
      <v-spacer></v-spacer>
      <OAUpload :loading="loading" @upload="upload"></OAUpload>
      <v-spacer></v-spacer>
    </div>
  </main>
</template>

<script>
import OAUpload from '@/components/OAUpload';
import OASpider from '@/components/OASpider';
import { uploadData, fetchDataFromIEEE } from '@/api/index';
import { read, convert2CsvBlob } from '@/utils/csvreader';
export default {
  components: {
    OAUpload,
    OASpider,
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    upload(file) {
      this.loading = true;

      read(file).then((data) => {
        const handleData = data.filter(
          (i) => i['Authors'] && i['Author Affiliations']
        );
        const formData = new FormData();
        formData.append('file', convert2CsvBlob(handleData));
        uploadData(formData).then(
          () => {
            alert('上传成功！数据正在更新...');
            this.loading = false;
            this.$router.push('/');
          },
          (message) => {
            alert(`上传失败！${message}`);
            this.loading = false;
          }
        );
      });
    },
    getData({ conference, start, end }) {
      this.loading = true;
      fetchDataFromIEEE({ conference, start, end }).then(
        () => {
          alert('获取数据成功！');
          this.loading = false;
        },
        (message) => {
          alert(`获取数据失败！${message}`);
          this.loading = false;
        }
      );
    },
  },
};
</script>

<style scoped>
.update-container {
  height: 100%;
  display: flex;
}
.card {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 4em;
  border-right: 2px solid lightgray;
  max-width: 800px;
  flex: 1;
}
.card:last-child {
  border-right: none;
}
.card-title {
  text-align: center;
  color: grey;
}
</style>
