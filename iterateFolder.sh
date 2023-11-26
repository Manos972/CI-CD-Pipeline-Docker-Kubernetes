for dir in */; do
  dir=${dir%*/}
  if [ "$dir" != "infra" ]; then
    image_name="$CI_REGISTRY/manos972/tp_fil_rouge/${dir}:v1.4"
    docker build -t $image_name ./$dir
    docker push $image_name
  fi
done
