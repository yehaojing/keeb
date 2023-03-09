from fastapi import APIRouter, UploadFile, Depends
from fastapi.responses import Response
from sqlalchemy.orm import Session

import src.app.models as models
import src.app.schemas as schemas
from src.app.dependencies import get_session


router = APIRouter(
    tags=["images"]
)


@router.post("/upload/")
async def create_upload_file(
    file: UploadFile,
    session: Session = Depends(get_session)
):

    image_db = models.Image(
        image=await file.read()
    )

    session.add(image_db)
    session.commit()
    session.refresh(image_db)
    session.close()
    return {"filename": file.filename}


@router.get(
    "/retrieve/{image_id}",
    response_model=schemas.ImageRetrieve,
    responses={
        200: {
            "content": {"image/png": {}},
            "description": "Return an image.",
        }
    }
)
async def retrieve_file(
    image_id: int,
    session: Session = Depends(get_session),
):

    image = session.query(models.Image).get(image_id)

    if image:
        return Response(content=image.image, media_type="image/png")
    else:
        return {"id": image_id,
                "message": f"Image with id '{image_id}' not found."}
