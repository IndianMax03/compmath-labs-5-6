<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%-- created by Raj Manu on 20.05.2023 --%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<head>
    <title>Лапа №5</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <style>
        * {
            font-family: 'Aclonica', math !important;
            font-size: 18px;
        }
        #immutableTable .table td,
        #immutableTable .table th {
            text-align: center;
        }
        #mutableTable .table td,
        #mutableTable .table th {
            text-align: center;
        }
        .input.is-danger {
            border-color: red;
        }
    </style>
</head>
<body>

<section class="section">
    <div class="columns is-centered is-vcentered has-text-centered">
        <div class="column is-5">
            <div class="py-3">
                <div class="py-2">
                    <label for="data">Выберите способ задания входных данных:</label>
                </div>
                <div class="select is-black has-text-light is-medium">
                    <select name="dataType" id="data">
                        <option value="file">файл</option>
                        <option value="table">таблица</option>
                        <option value="function">функция</option>
                    </select>
                </div>
            </div>


            <div id="file" class="py-3" style="display: none">
                <div class="file is-centered is-dark">
                    <label class="file-label">
                        <input id="dataFile" class="file-input" type="file" name="data">
                        <span class="file-cta">
                                <span class="file-label">
                                    Выбрать файл...
                                </span>
                        </span>
                    </label>
                </div>
            </div>

            <div id="functionParams" class="box" style="display: none">
                <div><label id="aLabel" for="a">a:</label><input class="input" size="10" id="a" type="text"></div>
                <div><label id="bLabel" for="b">b:</label><input class="input" size="10" id="b" type="text"></div>
                <div><label id="nLabel" for="n">n:</label><input class="input" size="10" id="n" type="text"></div>
            </div>

            <div id="function" class="box" style="display: none">
                <div class="control has-text-left">
                    <div class="py-3">
                        <label class="radio">
                            <input type="radio" id="polynomialEquation" name="equation" checked>
                            <span id="polynomial" class="ml-5"></span>
                        </label>
                    </div>
                    <div class="py-3">
                        <label class="radio">
                            <input type="radio" id="sinusEquation" name="equation">
                            <span id="sinus" class="ml-5"></span>
                        </label>
                    </div>
                </div>
            </div>

            <div id="immutableTable" style="display: none">
                <table class="table is-fullwidth">
                    <thead>
                    <tr>
                        <th>x</th>
                        <th>y</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th class="xColumn">1</th>
                        <th class="yColumn">2</th>
                    </tr>
                    <tr>
                        <th class="xColumn">3</th>
                        <th class="yColumn">4</th>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div id="mutableTable" style="display: none">
                <table class="table is-fullwidth">
                    <thead>
                    <tr>
                        <th>x</th>
                        <th>y</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th><input class="xColumn" type="text"></th>
                        <th><input class="yColumn" type="text"></th>
                    </tr>
                    <tr>
                        <th><input class="xColumn" type="text"></th>
                        <th><input class="yColumn" type="text"></th>
                    </tr>
                    </tbody>
                </table>
                <button id="add" class="button is-dark px-3 mx-4 my-2">добавить строку</button>
                <button id="remove" class="button is-dark px-3 mx-4 my-2">удалить строку</button>
                <button id="fill" class="button is-dark px-3 mx-4 my-2">заполнить</button>
                <button id="clear" class="button is-dark px-3 mx-4 my-2">очистить</button>
            </div>
        </div>
        <div class="column is-5">Здесь будет график</div>
    </div>
</section>

<section class="section">
    <div class="columns is-centered is-vcentered has-text-centered">
        <div class="column is-5">
            Найденное значение x
        </div>
        <div class="column is-5">
            Таблица конечных разностей
        </div>
    </div>
</section>

<script src="<c:url value="/js/formatter.js"/>"></script>
<script src="<c:url value="/js/dataInputListener.js"/>"></script>
<script src="<c:url value="/js/fileWorker.js"/>"></script>
<script src="<c:url value="/js/tableListener.js"/>"></script>
<script src="<c:url value="/js/tableButtons.js"/>"></script>
<script src="<c:url value="/js/functionParamsListener.js"/>"></script>
</body>
</html>
