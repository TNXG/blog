---
layout: false
---
<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="UTF-8">
    <title>TNXGのBlog-cgi</title>
    <link rel="icon" type="image/png" href="/assets/images/favicon.png">
    <link rel="stylesheet" href="https://cdn.staticfile.org/normalize/5.0.0/normalize.min.css">
    <link rel="stylesheet" href="/assets/css/cgi.css">
    <script src="/assets/js/cgi.js"></script>
    <script src="/assets/js/uamessage.js"></script>
</head>
<body translate="no">
    <div class="app-container">
        <div class="app-header">
            <div class="app-header-left">
                <p class="app-name">TNXG's Blog-CGI</p>
            </div>
        </div>
        <div class="app-content">
            <div class="projects-section">
                <div class="project-boxes jsGridView">
                    <div class="project-box-wrapper">
                        <div class="project-box" style="background-color: #d5deff;">
                            <div class="project-box-header">
                                <span>
                                    CloudFlare接入状态
                                </span>
                            </div>
                            <div class="project-box-content-header">
                                <p class="box-content-header"><span id="tnxg_cgi_CDNState"></span><br><br><br>
                                </p>
                            </div>
                            <div class="project-box-footer">
                                <div class="participants">
                                </div>
                                <div class="days-left" style="color: #4067f9;">
                                    CloudFlare接入状态卡片
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="project-box-wrapper">
                        <div class="project-box" style="background-color: #d5deff;">
                            <div class="project-box-header">
                                <span>
                                    用户信息
                                </span>
                            </div>
                            <div class="project-box-content-header">
                                <p class="box-content-header">
                                    <span id="tnxg_cgi_userip"></span><br>
                                    <span id="tnxg_cgi_userloc"></span><br>
                                    <span id="tnxg_cgi_userid"></span><br>
                                    <span id="tnxg_cgi_userua"></span><br>
                                    <span id="tnxg_cgi_system"></span><br>
                                </p>
                            </div>
                            <div class="project-box-footer">
                                <div class="participants">
                                </div>
                                <div class="days-left" style="color: #4067f9;">
                                    用户信息卡片
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="project-box-wrapper">
                        <div class="project-box" style="background-color: #d5deff;">
                            <div class="project-box-header">
                                <span>
                                    静态资源站状态信息
                                </span>
                            </div>
                            <div class="project-box-content-header">
                                <p class="box-content-header">
                                    <span id="tnxg_cgi_cdnstatus_eleme"></span><br>
                                    <span id="tnxg_cgi_cdnstatus_jc"></span><br>
                                    <span id="tnxg_cgi_cdnstatus_jf"></span><br>
                                    <span id="tnxg_cgi_cdnstatus_jg"></span><br>
                                    <span id="tnxg_cgi_cdnstatus_doge"></span><br>
                                    <span id="tnxg_cgi_cdnstatus_tianli"></span><br>
                                </p>
                            </div>
                            <div class="project-box-footer">
                                <div class="participants">
                                </div>
                                <div class="days-left" style="color: #4067f9;">
                                    静态资源站状态信息卡片
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="project-box-wrapper">
                        <div class="project-box" style="background-color: #d5deff;">
                            <div class="project-box-header">
                                <span>
                                    后端API状态信息
                                </span>
                            </div>
                            <div class="project-box-content-header">
                                <p class="box-content-header">
                                    <span id="tnxg_cgi_apistatus_prts"></span><br>
                                    <span id="tnxg_cgi_apistatus_qexo"></span><br>
                                    <span id="tnxg_cgi_apistatus_assets"></span><br>
                                    <span id="tnxg_cgi_apistatus_twikoo"></span><br>
                                    <span id="tnxg_cgi_apistatus_fc"></span><br>
                                </p>
                            </div>
                            <div class="project-box-footer">
                                <div class="participants">
                                </div>
                                <div class="days-left" style="color: #4067f9;">
                                    后端API状态信息卡片
                                </div>
                            </div>
                        </div>
                    </div>
                                        <div class="project-box-wrapper">
                        <div class="project-box" style="background-color: #d5deff;">
                            <div class="project-box-header">
                                <span>
                                    ClientWorker信息
                                </span>
                            </div>
                            <div class="project-box-content-header">
                                <p class="box-content-header">
                                    <span id="tnxg_cgi_cwstatus_InstallStatus"></span><br>
                                    <span id="tnxg_cgi_cwstatus_ClientWorkerVersion"></span><br>
                                    <span id="tnxg_cgi_cwstatus_ConfigVersion"></span><br>
                                    <span id="tnxg_cgi_cwstatus_ConfigLastUpdateTime"></span><br>
                                </p>
                            </div>
                            <div class="project-box-footer">
                                <div class="participants">
                                </div>
                                <div class="days-left" style="color: #4067f9;">
                                    ClientWorker信息卡片
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
</body>
<script>cgi_start()</script>
</html>