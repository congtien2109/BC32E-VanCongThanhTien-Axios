// Get: lay du lieu tu sv

function getApiPrd() {
  var promise = axios({
    url: "https://svcy.myclass.vn/api/Product/GetAll", //Duong dan backend cung cap
    method: "GET",
  });
  //Xu ly thanh cong
  promise.then(function (result) {
    console.log(result.data);
    //Sau khi lay du lieu tu backend ve dung du lieu do tao ra tr tren table
    renderTablePrd(result.data);
  });
  //Xu ly that bai
  promise.catch(function (err) {});
}
//Goi ham lay du lieu tu server khi trang web vua load xong
window.onload = function () {
  getApiPrd();
};

// Post them du lieu
document.querySelector("#btnCreate").onclick = function () {
  //Lay thong tin ng dung tu giao dien nhap lieu
  var prd = new Products();
  prd.id = document.querySelector("#id").value;
  prd.name = document.querySelector("#name").value;
  prd.price = document.querySelector("#price").value;
  prd.img = document.querySelector("#img").value;
  prd.description = document.querySelector("#description").value;
  prd.type = document.querySelector("#type").value;

  // console.log(prd);
  //Goi api dua du lieu ve  back end
  var promise = axios({
    url: "https://svcy.myclass.vn/api/Product/CreateProduct",
    method: "POST",
    data: prd,
  });

  promise.then(function (result) {
    console.log(result.data);
    getApiPrd();
  });
  promise.catch(function (error) {
    console.log(error);
  });

  //Moi lan bam Create se them prd vao mangPrd
  // mangPrd.push(prd);
  // console.log('mangPrd', mangPrd);
  // renderTablePrd(mangPrd)
  /*    
    //tao table
    var trPrd = document.createElement('tr');

    //Dom den 1 the co san tren giao dien(Tbody nhung the tr vao)
    document.querySelector('#tblSinhVien').appendChild(trPrd);
    //tao cac the td
    var tdId = document.createElement('td');
    tdId.innerHTML = prd.id;

    var tdImg = document.createElement('td');
    tdImg.innerHTML = prd.img;

    var tdName = document.createElement('td');
    tdName.innerHTML = prd.name;

    var tdPrice = document.createElement('td');
    tdPrice.innerHTML = prd.price;

    var tdDescription = document.createElement('td');
    tdDescription.innerHTML = prd.description;

    var tdType = document.createElement('td');
    tdType.innerHTML = prd.type;
    
    //Td chhuc nang
    var tdChucNang = document.createElement('td');
    var btnDel = document.createElement('button');
    btnDel.className = 'btn btn-danger';
    btnDel.innerHTML = 'Delete';
    //luc tao button tao luon su kien onclick cho button do
    btnDel.onclick = function (){
        trPrd = btnDel.closest('tr');
        trPrd.remove();
    }
    tdChucNang.append(btnDel);

    //nhung the td vao tr
    trPrd.appendChild(tdId);
    trPrd.appendChild(tdImg);
    trPrd.appendChild(tdName);
    trPrd.appendChild(tdPrice);
    trPrd.appendChild(tdDescription);
    trPrd.appendChild(tdType);
    trPrd.appendChild(tdChucNang);
*/
};
function renderTablePrd(arrPrd) {
  var html = "";
  for (var index = 0; index < arrPrd.length; index++) {
    // Moi lan duyet lay ra 1 san pham
    var prd = arrPrd[index];
    //Tao ra 1 chuoi html tr va dua vao output
    html += `
            <tr>
                <td>${prd.id}</td>
                <td><img src="${prd.img}" style="width: 100px;"></td>
                <td>${prd.name}</td>
                <td>${prd.price}</td>
                <td>${prd.description}</td>
                <td>${prd.type}</td>
                <td>
                <button class="btn btn-danger" onclick="DelPrd('${prd.id}')">Delete</button>
                <button class="btn btn-primary mr-2" onclick="Update('${prd.id}')">Sửa</button>
                </td>
            </tr>
        `;
  }
  document.querySelector("#tblPrd").innerHTML = html;
}
//DEL
function DelPrd(idClick) {
  var promise = axios({
    url: "https://svcy.myclass.vn/api/Product/DeleteProduct/" + idClick,
    method: "DELETE",
  });
  promise.then(function (result) {
    console.log(result.data);
    //goi api lay danhh sach san pham sau khi xoa thanh cong
    getApiPrd();
  });
  promise.catch(function (err) {});
}
function Update(idPrd) {
  var promise = axios({
    url: "https://svcy.myclass.vn/api/Product/GetById/" + idPrd,
    method: "GET",
  });
  promise.then(function (result) {
    var prd = result.data;
    //Dem sinh vien load len cac the
    document.querySelector("#id").value = prd.id;
    document.querySelector("#name").value = prd.name;
    document.querySelector("#price").value = prd.price;
    document.querySelector("#img").value = prd.img;
    document.querySelector("#description").value = prd.description;
    document.querySelector("#type").value = prd.type;
  });
  promise.catch(function (err) {});
}
//PUT cap nhat du lieu
document.querySelector("#btnUpdate").onclick = function () {
  var prdUpdate = new Products();
  prdUpdate.id = document.querySelector("#id").value;
  prdUpdate.name = document.querySelector("#name").value;
  prdUpdate.price = document.querySelector("#price").value;
  prdUpdate.img = document.querySelector("#img").value;
  prdUpdate.description = document.querySelector("#description").value;
  prdUpdate.type = document.querySelector("#type").value;
  //Call api
  var promise = axios({
    url: "https://svcy.myclass.vn/api/Product/UpdateProduct/" + prdUpdate.id,
    method: "PUT",
    data: prdUpdate,
  });
  promise.then(function (result) {
    console.log(result.data);
    getApiPrd();
  });
  promise.catch(function (err) {
    console.log(err);
  });
};
//Search
document.querySelector("#btnSer").onclick = function () {
  var searchPro = document.querySelector("#ipSer").value;
  //Call api
  var promise = axios({
    url: "https://svcy.myclass.vn/api/Product/SearchByName?name=" + searchPro,
    method: "GET",
  });
  promise.then(function (result) {
    renderTablePrd(result.data);
  });
  promise.catch(function (err) {
    alert("Không tìm thấy");
  });
}
