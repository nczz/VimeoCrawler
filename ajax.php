<?php
header('Content-type: application/json');

require_once('vimeo.php');

$key = "34871819d29176cd95c3bd3e2c6cbb08531b6096";
$secret = "a3f4424bb4bdfba7bbae95a6be842d964a8ef72a";

$query = $_GET['q'];
$page = $_GET['p'];

$limit = 50; // number of videos to display for each search

$vimeo = new phpVimeo($key, $secret);
$response = $vimeo->call('vimeo.videos.getByTag', array('page' => $page, 'per_page' => $limit, 'full_response' => 1, 'tag' => $query, 'sort' => 'most_played'));

$jarray = array();

$jarray = $response->videos->video;
/*foreach($response->videos->video as $v){
	$videoinfo = $vimeo->call('vimeo.videos.getInfo', array('video_id' => $v->id));
	
	$jarray[] = array(
	"thumbnail" => $videoinfo->video[0]->thumbnails->thumbnail[1]->_content,
	"url" => $videoinfo->video[0]->urls->url[0]->_content,
	"title" => $videoinfo->video[0]->title,
	"username" => $videoinfo->video[0]->owner->display_name,
	"userurl" => $videoinfo->video[0]->owner->profileurl,
	"userpic" => $videoinfo->video[0]->owner->portraits->portrait[0]->_content
	);
}*/

//print_r(str_replace('\\/', '/', json_encode($jarray)));
//die();

echo json_encode($jarray);
?>